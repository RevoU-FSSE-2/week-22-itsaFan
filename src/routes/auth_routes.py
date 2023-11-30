from flask import Blueprint, request, jsonify, make_response
from extensions import bcrypt
from db_config import db
from services.user_services import create_user, find_user_by_username, create_access_token, create_refresh_token, verify_refresh_token, generate_access_token
import datetime
from helpers.permission_helpers import get_role_name

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


@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = find_user_by_username(db, username)

    if user and bcrypt.check_password_hash(user['password'], password):
        role_name = get_role_name(db, user['role']) 
        user_data = {
            "userId": str(user['_id']),
            "username": user['username'],
            "email": user['email'],
            "role": role_name
        }
        access_token = create_access_token(user_data, datetime.timedelta(minutes=30))
        refresh_token = create_refresh_token(user_data, datetime.timedelta(days=7))

        response = make_response(jsonify(accessToken=access_token))
        response.set_cookie('steffToken', refresh_token, max_age=7*24*60*60, httponly=True)
        return response

    return jsonify({"msg": "Invalid username or password"}), 401


@auth_bp.route('/logout', methods=['POST'])
def logout():

    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.delete_cookie('steffToken')
    return response


@auth_bp.route('/refresh', methods=['POST'])
def refresh_token():
    try:
        refresh_token = request.cookies.get('steffToken')
        if not refresh_token:
            return jsonify({"message": "Refresh token is required"}), 401

        user_payload = verify_refresh_token(refresh_token)
        if not user_payload:
            return jsonify({"message": "Invalid or expired refresh token"}), 403

        new_access_token = generate_access_token(user_payload['userId'], user_payload['username'], user_payload['email'], user_payload['role'])
        return jsonify({"accessToken": new_access_token})

    except Exception as e:
        print("Internal server error:", e)
        return jsonify({"message": "Internal Server error"}), 500