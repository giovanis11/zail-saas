# backend/app/schemas.py

from pydantic import BaseModel

# -------- USERS --------
class SignupRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

# -------- BOATS --------
class BoatCreateRequest(BaseModel):
    name: str
    location: str
    price: float
    description: str
    image_url: str
    capacity: int


# -------- BOOKINGS --------
class BookingBase(BaseModel):
    boat_id: int
    start_date: str
    end_date: str

class BookingCreate(BaseModel):
    boat_id: int
    start_date: str
    end_date: str
    user_id: int = 1  # default user for now


class BookingUpdate(BaseModel):
    status: str

class Booking(BookingBase):
    id: int
    user_id: int
    total_price: float
    status: str

    class Config:
        from_attributes = True

class Boat(BaseModel):
    id: int
    name: str
    location: str
    price: float
    description: str
    image_url: str
    capacity: int

    class Config:
        from_attributes = True
