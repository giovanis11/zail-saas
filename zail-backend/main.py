# src/main.py

from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from models import Base, User, Boat, Booking
import schemas

# ----- ENVIRONMENT SETUP -----
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# ----- DATABASE SETUP -----
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# ----- APP SETUP -----
app = FastAPI()

# ----- CORS -----
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
      "http://localhost:5173",
      "http://zail.gr",
      "https://zail.gr"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- Dependency -----
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----- ROUTES -----

# SIGNUP
@app.post("/api/signup")
async def signup(request: schemas.SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        return {"success": False, "message": "Email already registered."}

    new_user = User(email=request.email, password=request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True, "message": "User created successfully!"}

# LOGIN
@app.post("/api/login")
async def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request.email).first()
    if not db_user or db_user.password != request.password:
        return {"success": False, "message": "Invalid email or password"}

    return {"success": True, "token": "fake-jwt-token"}  # Replace later with real JWT

# BOAT CREATE
@app.post("/api/boats/create")
async def create_boat(boat: schemas.BoatCreateRequest, db: Session = Depends(get_db)):
    new_boat = Boat(
        name=boat.name,
        location=boat.location,
        price=boat.price,
        description=boat.description,
        image_url=boat.image_url,
        owner_id=1,  # Hardcoded for now; later use the logged-in user ID
        capacity=boat.capacity  # in Boat creation
    )
    db.add(new_boat)
    db.commit()
    db.refresh(new_boat)
    return {"success": True, "message": "Boat created successfully!"}


# GET MY BOATS (all boats by current user if needed later)
@app.get("/api/boats/my")
async def get_my_boats(db: Session = Depends(get_db)):
    boats = db.query(Boat).all()
    return boats

# GET ALL BOATS
@app.get("/api/boats/all")
async def get_all_boats(db: Session = Depends(get_db)):
    boats = db.query(Boat).all()
    return boats

@app.get("/api/boats/{id}")
async def get_boat(id: int, db: Session = Depends(get_db)):
    boat = db.query(Boat).filter(Boat.id == id).first()
    if not boat:
        raise HTTPException(status_code=404, detail="Boat not found")
    return boat


# DELETE BOAT
@app.delete("/api/boats/delete/{id}")
async def delete_boat(id: int, db: Session = Depends(get_db)):
    boat = db.query(Boat).filter(Boat.id == id).first()
    if not boat:
        return {"success": False, "message": "Boat not found."}
    db.delete(boat)
    db.commit()
    return {"success": True, "message": "Boat deleted successfully!"}

# EDIT BOAT
@app.put("/api/boats/edit/{id}")
async def edit_boat(id: int, updated_boat: schemas.BoatCreateRequest, db: Session = Depends(get_db)):
    boat = db.query(Boat).filter(Boat.id == id).first()
    if not boat:
        return {"success": False, "message": "Boat not found."}

    boat.name = updated_boat.name
    boat.location = updated_boat.location
    boat.price = updated_boat.price
    boat.description = updated_boat.description
    boat.image_url = updated_boat.image_url
    boat.capacity = updated_boat.capacity  # ✅ Fixed here

    db.commit()
    db.refresh(boat)

    return {"success": True, "message": "Boat updated successfully!", "boat": boat}


# BOOKING CREATE
@app.post("/api/bookings/create", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    boat = db.query(Boat).filter(Boat.id == booking.boat_id).first()
    if not boat:
        raise HTTPException(status_code=404, detail="Boat not found")

    start = datetime.strptime(booking.start_date, "%Y-%m-%d")
    end = datetime.strptime(booking.end_date, "%Y-%m-%d")
    days = (end - start).days
    if days <= 0:
        raise HTTPException(status_code=400, detail="End date must be after start date")

    total_price = days * boat.price

    db_booking = Booking(
        boat_id=booking.boat_id,
        user_id=booking.user_id,  # ✅ now uses value from schema
        start_date=booking.start_date,
        end_date=booking.end_date,
        total_price=total_price,
        status="pending"
    )

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


# BOOKING UPDATE STATUS
@app.put("/api/bookings/update/{booking_id}", response_model=schemas.Booking)
def update_booking(booking_id: int, booking_update: schemas.BookingUpdate, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = booking_update.status
    db.commit()
    db.refresh(booking)
    return booking

# GET MY BOOKINGS
@app.get("/api/bookings/mine", response_model=List[schemas.Booking])
def get_my_bookings(user_id: int, status: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Booking).filter(Booking.user_id == user_id)
    if status:
        query = query.filter(Booking.status == status)
    bookings = query.all()
    return bookings


@app.get("/api/owner/bookings")
def get_owner_bookings(user_id: int, db: Session = Depends(get_db)):
    boats = db.query(Boat).filter(Boat.owner_id == user_id).all()
    boat_ids = [boat.id for boat in boats]

    bookings = db.query(Booking).filter(Booking.boat_id.in_(boat_ids)).all()
    return bookings
