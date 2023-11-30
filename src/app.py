from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from config import Config
from extensions import bcrypt
from db_config import db, mongo_client 
from utils.seeding import seed_permissions
# Routing
from routes.auth_routes import auth_bp
from routes.todo_routes import todo_bp

app = Flask(__name__)
# Utils
bcrypt.init_app(app) 
app.config.from_object(Config)

seed_permissions(db)
def check_mongo_connection():
    try:
        mongo_client.admin.command('ping')
        print("Successfully connected to Database")
    except Exception as e:
        print(f"Failed to connect to Database: {e}")
        exit(1)

check_mongo_connection()


# Routes
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(todo_bp, url_prefix='/api/todo')