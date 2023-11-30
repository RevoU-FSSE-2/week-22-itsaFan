def get_role_id(db, role_name):
    role = db.permissions.find_one({"role": role_name})
    return role['_id'] if role else None
