import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGODB_URI')
    ACCESS_SECRET = os.getenv('ACCESS_SECRET')
    REFRESH_SECRET = os.getenv('REFRESH_SECRET')