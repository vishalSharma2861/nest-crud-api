Install nest js cli then install nest js project by npm
run server ...npm run start:dev


for user signup
url = "http://localhost:3003/user"
method = post
body parameter = username and password...both are string
output:
{
    "message": "Signup successfully"
}

for user login
url = "http://localhost:3003/auth/login"
method = "post"
body parameter = username and password
output:{
    "message": "Login sucessfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWZkNTAwNWRkNzkxYmY2ZjVmYTY5ZTIiLCJ1c2VybmFtZSI6InZpc2hhbCBzaGFybWEiLCJpYXQiOjE3MTExNjcwMjYsImV4cCI6MTcxNjM1MTAyNn0.qCXcUqenFAiXEPCXt4lcoTOQ8I1ZcLWWC8QnYE49itw"
}

for creating task..only authenticated user can add task
first login

add task = url = "http://localhost:3003/task"
method = "post"
body parameter
    action = string,
    taskName = string
    description = string
    priority = enum, (HIGH, MEDIUM, LOW)
    status = enum, (NOT_STARTED, PARTIALLY_DONE, IN_PROGRESS, COMPLETE)
    dueDateTime = date(string)

output:
{
    "message": "Task has been added succesfully"
}

task list
url = "http://localhost:3003/task"
method = get
query params = (page, userName, action, priority, status)

output:
{
    "message": "Task list",
    "task": [
        {
            "_id": "65fe569e7e04846d88378bf4",
            "userId": "65fd5005dd791bf6f5fa69e2",
            "action": "whatsapp",
            "taskName": "packing",
            "description": "test",
            "priority": "HIGH",
            "status": "NOT_STARTED",
            "dueDateTime": "2024-03-25T00:00:00.000Z",
            "user_detail": {
                "username": "vishal sharma"
            }
        }
    ]
}

task update
url = "http://localhost:3003/task?id=65fe3d52806fef6115467919"
method = put
query param = task id as id
body parameter
    action = string,
    taskName = string
    description = string
    priority = enum, (HIGH, MEDIUM, LOW)
    status = enum, (NOT_STARTED, PARTIALLY_DONE, IN_PROGRESS, COMPLETE)
    dueDateTime = date(string)

output:
{
    "message": "Task updated sucessfully",
    "data": {
        "_id": "65fe569e7e04846d88378bf4",
        "userId": "65fd5005dd791bf6f5fa69e2",
        "action": "whtsp",
        "taskName": "packing",
        "description": "test",
        "priority": "HIGH",
        "status": "NOT_STARTED",
        "dueDateTime": "2024-03-25T00:00:00.000Z",
        "__v": 0
    }
}


task delete
url = "http://localhost:3003/task?id=65fe4096a9ea6726ecdd2e37"
method = delete
query param = task id as id

output:
{
    "message": "Task deleted sucessfully"
}