from sqlalchemy import (
    Column,
    Index,
    Integer,
    String,
    ForeignKey,
    Enum,
    Text,
)
from sqlalchemy.orm import relationship

from .meta import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(length=255), unique=True, nullable=False)
    password = Column(String(length=255), nullable=False)
    role = Column(Enum('admin', 'user', nullable=False))
    tokens = relationship('Token', back_populates='user')


class Token(Base):
    __tablename__ = 'tokens'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    jwt_token = Column(Text, nullable=False)
    user = relationship('User', back_populates='tokens')


class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)


Index('my_index', MyModel.name, unique=True, mysql_length=255)
