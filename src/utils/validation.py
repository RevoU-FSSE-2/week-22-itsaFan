import re

def validate_password(password):
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")

    if not re.search("[a-zA-Z]", password):
        raise ValueError("Password must contain letters")

    if not re.search("[0-9]", password):
        raise ValueError("Password must contain numbers")

    if not re.match("^[a-zA-Z0-9]*$", password):
        raise ValueError("Password must be alphanumeric")