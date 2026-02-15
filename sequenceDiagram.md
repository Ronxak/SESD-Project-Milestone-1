# Sequence Diagram — Study Planner System
## Main Flow: User Authentication → Subject Creation → Task Creation → Study Session Tracking
This sequence diagram illustrates the complete lifecycle of a user interacting with the Study Planner System — from user registration and authentication, to creating subjects and tasks, and finally starting and ending a study session while securely storing and retrieving data from the database.

```mermaid

sequenceDiagram
    actor U as User
    participant FE as Frontend (Client Application)
    participant API as Backend API (Express Server)
    participant Auth as Auth Service
    participant SubS as Subject Service
    participant TaskS as Task Service
    participant SessS as Session Service
    participant Repo as Repository Layer
    participant DB as MongoDB Database

    Note over U, DB: Phase 1 — User Registration and Authentication

    U ->> FE: Register Account
    FE ->> API: POST /api/auth/register
    API ->> Auth: register(userData)
    Auth ->> Repo: saveUser(userData)
    Repo ->> DB: INSERT user document
    DB -->> Repo: User created
    Repo -->> Auth: User saved
    Auth -->> API: Registration success
    API -->> FE: 201 Created
    FE -->> U: Account registered successfully

    U ->> FE: Login
    FE ->> API: POST /api/auth/login
    API ->> Auth: validateUser(credentials)
    Auth ->> Repo: findUserByEmail(email)
    Repo ->> DB: SELECT user document
    DB -->> Repo: User found
    Repo -->> Auth: Return user data
    Auth ->> Auth: Generate JWT Token
    Auth -->> API: JWT token
    API -->> FE: Authentication success
    FE -->> U: Login successful

    Note over U, DB: Phase 2 — Subject Creation and Retrieval

    U ->> FE: Create Subject
    FE ->> API: POST /api/subjects (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> SubS: createSubject(subjectData)
    SubS ->> Repo: saveSubject(subjectData)
    Repo ->> DB: INSERT subject document
    DB -->> Repo: Subject created
    Repo -->> SubS: Subject saved
    SubS -->> API: Success
    API -->> FE: 201 Created
    FE -->> U: Subject created successfully

    U ->> FE: View Subjects
    FE ->> API: GET /api/subjects (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> SubS: getSubjects(userId)
    SubS ->> Repo: findSubjectsByUser(userId)
    Repo ->> DB: SELECT subject documents
    DB -->> Repo: Subject list
    Repo -->> SubS: Return subjects
    SubS -->> API: Subject list
    API -->> FE: Subjects retrieved
    FE -->> U: Display subjects

    Note over U, DB: Phase 3 — Task Creation and Management

    U ->> FE: Create Task
    FE ->> API: POST /api/tasks (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> TaskS: createTask(taskData)
    TaskS ->> Repo: saveTask(taskData)
    Repo ->> DB: INSERT task document
    DB -->> Repo: Task created
    Repo -->> TaskS: Task saved
    TaskS -->> API: Success
    API -->> FE: 201 Created
    FE -->> U: Task created successfully

    U ->> FE: Mark Task as Completed
    FE ->> API: PUT /api/tasks/{id} (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> TaskS: updateTaskStatus(taskId)
    TaskS ->> Repo: updateTask(taskId)
    Repo ->> DB: UPDATE task document
    DB -->> Repo: Task updated
    Repo -->> TaskS: Success
    TaskS -->> API: Success
    API -->> FE: Task updated
    FE -->> U: Task marked as completed

    Note over U, DB: Phase 4 — Study Session Tracking

    U ->> FE: Start Study Session
    FE ->> API: POST /api/sessions/start (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> SessS: startSession(sessionData)
    SessS ->> Repo: saveSession(sessionData)
    Repo ->> DB: INSERT session document
    DB -->> Repo: Session started
    Repo -->> SessS: Success
    SessS -->> API: Session started
    API -->> FE: 201 Created
    FE -->> U: Study session started

    U ->> FE: End Study Session
    FE ->> API: PUT /api/sessions/end (JWT)
    API ->> Auth: Validate JWT
    Auth -->> API: Token valid
    API ->> SessS: endSession(sessionId)
    SessS ->> Repo: updateSession(sessionId)
    Repo ->> DB: UPDATE session document (endTime, duration)
    DB -->> Repo: Session updated
    Repo -->> SessS: Success
    SessS -->> API: Session ended
    API -->> FE: Session completed
    FE -->> U: Study session ended successfully
```
---
## Flow Summary

| Phase                         | Description                                                                          | Key Patterns Used           |
| ----------------------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| **1. Authentication**         | User registers and logs in with JWT authentication and secure password storage.      | Authentication Pattern, JWT |
| **2. Subject Management**     | User creates and views subjects with secure authorization.                           | Layered Architecture        |
| **3. Task Management**        | User creates, updates, and manages study tasks linked to subjects.                   | Service Layer Pattern       |
| **4. Study Session Tracking** | User starts and ends study sessions with duration tracking and database persistence. | Repository Pattern          |
| **5. Data Persistence**       | All user data is securely stored and retrieved from MongoDB.                         | Repository Pattern          |


