from db_config import db
from bson import ObjectId  
import datetime

def create_todo(title, description, priority, deadline, created_by):
    todo = {
        "title": title,
        "description": description or "",
        "priority": priority or "notSet",
        "deadline": datetime.datetime.strptime(deadline, '%Y-%m-%d') if deadline else None,
        "createdOn": datetime.datetime.utcnow(),
        "createdBy": ObjectId(created_by) 
    }
    todo_id = db.todos.insert_one(todo).inserted_id
    inserted_todo = db.todos.find_one({"_id": todo_id})
    inserted_todo['_id'] = str(inserted_todo['_id'])
    inserted_todo['createdBy'] = str(inserted_todo['createdBy'])

    return inserted_todo

def get_todo_by_creator(created_by):
    todos = db.todos.find({"createdBy": ObjectId(created_by)})

    enhanced_todos = []
    for todo in todos:
        user = db.users.find_one({"_id": todo['createdBy']})

        user_data = {
            '_id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }

        enhanced_todo = {**todo, '_id': str(todo['_id']), 'createdBy': user_data}
        enhanced_todos.append(enhanced_todo)

    return enhanced_todos



def get_all_todos():
    todos = db.todos.find({})
    enhanced_todos = []
    for todo in todos:
        user = db.users.find_one({"_id": todo['createdBy']})
        user_data = {
            '_id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }
        enhanced_todo = {**todo, '_id': str(todo['_id']), 'createdBy': user_data}
        enhanced_todos.append(enhanced_todo)
    return enhanced_todos


def get_todo_by_id(todo_id):
    return db.todos.find_one({"_id": ObjectId(todo_id)})

def delete_todo(todo_id):
    return db.todos.delete_one({"_id": ObjectId(todo_id)}).deleted_count

def update_todo(todo_id, new_todo_data):
    updated_data = {k: v for k, v in new_todo_data.items() if v is not None}  
    return db.todos.update_one({"_id": ObjectId(todo_id)}, {"$set": updated_data}).modified_count

def search_todos(query, user_role, user_id):
    search_criteria = {}
    if user_role == "ROLE_ADMIN":
        search_criteria = {"title": {"$regex": query, "$options": "i"}}
    elif user_role == "ROLE_USER":
        search_criteria = {"$and": [{"title": {"$regex": query, "$options": "i"}}, {"createdBy": ObjectId(user_id)}]}
    return list(db.todos.find(search_criteria))
