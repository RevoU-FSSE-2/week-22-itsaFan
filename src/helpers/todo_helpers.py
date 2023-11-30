import datetime

def make_todo(title, description, priority, deadline, created_by):
    return {
        "title": title,
        "description": description or "",
        "priority": priority or "notSet",
        "deadline": deadline, 
        "createdOn": datetime.datetime.utcnow(),
        "createdBy": created_by
    }
