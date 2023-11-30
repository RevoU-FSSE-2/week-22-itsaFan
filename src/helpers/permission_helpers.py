def get_role_id(db, role_name):
    role = db.permissions.find_one({"role": role_name})
    return role['_id'] if role else None

def get_role_name(db, role_id):
    role = db.permissions.find_one({"_id": role_id})
    return role['role'] if role else None
