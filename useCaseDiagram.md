# Use Case Diagram — Study Planner System
## Overview
This diagram shows all major use cases for the Study Planner System, organized by the primary actor: User.
The system focuses on secure authentication, subject organization, task management, study session tracking, and progress monitoring, while ensuring data security, user isolation, and structured backend operations using JWT authentication.

```mermaid
graph TB
    subgraph Study Planner System
        UC1["Register Account"]
        UC2["Login"]
        UC3["Logout"]
        UC4["Manage Profile"]
        UC5["Create Subject"]
        UC6["View Subjects"]
        UC7["Delete Subject"]
        UC8["Create Task"]
        UC9["View Tasks"]
        UC10["Update Task"]
        UC11["Delete Task"]
        UC12["Mark Task as Completed"]
        UC13["Start Study Session"]
        UC14["End Study Session"]
        UC15["View Study Sessions"]
        UC16["View Study Progress"]
        UC17["Authenticate User (JWT Validation)"]
        UC18["Authorize User Access"]
        UC19["Save Data"]
        UC20["Retrieve Data"]
        UC21["Track Task Status"]
        UC22["Calculate Study Duration"]
    end

    User((User))
    System((System))

    %% User use cases
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC14
    User --> UC15
    User --> UC16

    %% System-driven use cases
    UC2 -.->|triggers| UC17
    UC17 -.->|enables| UC18
    UC5 -.->|triggers| UC19
    UC8 -.->|triggers| UC19
    UC6 -.->|triggers| UC20
    UC9 -.->|triggers| UC20
    UC12 -.->|updates| UC21
    UC14 -.->|calculates| UC22

``` 
---
## Use Case Descriptions 
| #    | Use Case                           | Actors | Description                                                          |
| ---- | ---------------------------------- | ------ | -------------------------------------------------------------------- |
| UC1  | Register Account                   | User   | Create a new account using name, email, and password.                |
| UC2  | Login                              | User   | Authenticate user and generate JWT token for secure access.          |
| UC3  | Logout                             | User   | Logout from the system and end the client session.                   |
| UC4  | Manage Profile                     | User   | View and manage personal profile information.                        |
| UC5  | Create Subject                     | User   | Create a subject to organize study tasks.                            |
| UC6  | View Subjects                      | User   | View all subjects created by the user.                               |
| UC7  | Delete Subject                     | User   | Remove a subject from the system.                                    |
| UC8  | Create Task                        | User   | Create a study task associated with a subject.                       |
| UC9  | View Tasks                         | User   | View all study tasks created by the user.                            |
| UC10 | Update Task                        | User   | Modify task information such as title, description, or deadline.     |
| UC11 | Delete Task                        | User   | Remove a study task from the system.                                 |
| UC12 | Mark Task as Completed             | User   | Update task status from pending to completed.                        |
| UC13 | Start Study Session                | User   | Start a study session for a selected subject.                        |
| UC14 | End Study Session                  | User   | End the study session and record session duration.                   |
| UC15 | View Study Sessions                | User   | View all study sessions performed by the user.                       |
| UC16 | View Study Progress                | User   | View study progress including completed tasks and sessions.          |
| UC17 | Authenticate User (JWT Validation) | System | Verify JWT token to ensure secure authentication.                    |
| UC18 | Authorize User Access              | System | Ensure user can only access their own subjects, tasks, and sessions. |
| UC19 | Save Data                          | System | Store subjects, tasks, and study sessions in MongoDB.                |
| UC20 | Retrieve Data                      | System | Fetch subjects, tasks, and sessions from MongoDB.                    |
| UC21 | Track Task Status                  | System | Maintain and update task completion status.                          |
| UC22 | Calculate Study Duration           | System | Calculate study session duration based on start and end time.        |
