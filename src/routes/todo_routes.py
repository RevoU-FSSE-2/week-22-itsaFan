from flask import Blueprint, request, jsonify
from db_config import db  
from services.todo_services import create_todo, get_todo_by_creator, get_all_todos
from services.user_services import get_current_user, is_user_authorized

todo_bp = Blueprint('todo_bp', __name__)

@todo_bp.route('/add', methods=['POST'])
def add_todo():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({"message": "Unauthorized"}), 401

        title = request.json.get('title')
        description = request.json.get('description')
        priority = request.json.get('priority')
        deadline = request.json.get('deadline')

        todo = create_todo(title, description, priority, deadline, current_user['userId'])
        return jsonify({"message": "Todo created successfully", "todo": todo}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@todo_bp.route('/me', methods=['GET'])
def view_my_todos():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({"message": "Unauthorized"}), 401

        user_id = current_user['userId']
        my_todos = get_todo_by_creator(user_id)
        return jsonify({"message": "Todo List", "todos": my_todos}), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@todo_bp.route('/all', methods=['GET'])
def view_all_todos():
    try:
        if not is_user_authorized():
            return jsonify({"message": "Unauthorized, admin access required"}), 403

        todos = get_all_todos()
        return jsonify(todos), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
