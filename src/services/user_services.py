from helpers.user_helpers import make_user
from extensions import bcrypt
from helpers.permission_helpers import get_role_id
from utils.validation import validate_password

def create_user(db, username, email, password, default_role='ROLE_USER'):
    
    if db.users.find_one({"username": username}):
        raise ValueError("Username already exists")
    validate_password(password)
    
    role_id = get_role_id(db, default_role)
    if not role_id:
        raise ValueError(f"Default role '{default_role}' not found in permissions.")

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = make_user(username, email, hashed_password, role_id)
    return db.users.insert_one(user_data)

def find_user_by_username(db, username):
    return db.users.find_one({"username": username})

def find_user_by_email(db, email):
    return db.users.find_one({"email": email})
