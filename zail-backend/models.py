### backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    boats = relationship('Boat', back_populates='owner')
    bookings = relationship('Booking', back_populates='user')

class Boat(Base):
    __tablename__ = 'boats'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String)
    image_url = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship('User', back_populates='boats')
    bookings = relationship('Booking', back_populates='boat')
    capacity = Column(Integer, nullable=False, default=2)

    


class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True, index=True)
    boat_id = Column(Integer, ForeignKey('boats.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(String, default='pending')
    boat = relationship('Boat', back_populates='bookings')
    user = relationship('User', back_populates='bookings')