

def seed_permissions(db):
    permissions = ['ROLE_USER', 'ROLE_ADMIN']

    for permission in permissions:
        # Check if the permission already exists
        if db.permissions.count_documents({'role': permission}) == 0:
            db.permissions.insert_one({'role': permission})
            print(f"Seeded permission: {permission}")
        else:
            print(f"Permission already exists: {permission}")
