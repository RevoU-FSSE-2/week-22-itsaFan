from flask import Blueprint, request, jsonify
from app import db
from services.user_services import create_user

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']

        user_id = create_user(db, username, email, password)
        return jsonify({"message": "User created successfully", "user_id": str(user_id.inserted_id)}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

