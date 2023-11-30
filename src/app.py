from flask import Flask
from pymongo import MongoClient
from config import Config


app = Flask(__name__)

app.config.from_object(Config)
mongo_client = MongoClient(app.config['MONGO_URI'])
db = mongo_client.revou_week22


def check_mongo_connection():
    try:
        mongo_client.admin.command('ping')
        print("Successfully connected to Database")
    except Exception as e:
        print(f"Failed to connect to Database: {e}")
        exit(1)

check_mongo_connection()