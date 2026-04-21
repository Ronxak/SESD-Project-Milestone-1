# Study Planner System — A Secure Backend-Focused Study Management Platform
## Problem Statement
Most student productivity or planner applications focus only on simple CRUD operations such as creating tasks or displaying lists. While these applications demonstrate basic functionality, they fail to address important backend engineering challenges such as:
Secure user authentication and access control
Structured relationships between users, subjects, and tasks
Persistent tracking of study sessions
Proper backend architecture using layered design
Maintainable and scalable code organization
In real-world productivity platforms, the complexity lies in system architecture, secure API design, data modeling, and structured backend logic, rather than just frontend interfaces.
## About the Project
The **Study Planner System** is a robust, backend-focused study management platform designed to help users organize their academic workflow in a structured and secure manner. Unlike simple task managers, this system emphasizes backend engineering principles including:
- **Secure Authentication**: Robust user registration and login using JWT.
- **Data Integrity**: Structured relationships between Users, Subjects, and Tasks.
- **Activity Tracking**: Persistent logging of study sessions with automatic duration calculations.
- **Scalable Architecture**: A clean, layered design that separates controllers, services, and repositories.

The system ensures that each user has exclusive access to their own data, providing a personalized and private study management experience.
## Key Features
Secure user registration and login using JWT authentication
Subject management for organizing study areas
Task creation, updating, deletion, and completion tracking
Study session tracking with start and end time recording
Automatic calculation of study session duration
User-specific data isolation and access control
Backend-first architecture with clean layered design
## User Roles and Workflow
User
Register and login securely
Create and manage subjects
Create and manage study tasks
Mark tasks as completed
Start and end study sessions
View study history and progress
## Target Users
Students managing daily study plans
Developers learning backend system design
Academic projects requiring structured backend implementation
Recruiters evaluating backend engineering skills
## Technology Stack
Backend
Node.js
TypeScript
Express.js
MongoDB
Mongoose ORM
JWT Authentication
bcrypt for password hashing
## Development Tools
- **VS Code**: Primary Editor
- **Git & GitHub**: Version Control
- **Postman**: API Testing & Documentation
- **MongoDB Compass**: Database Visualization

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or Atlas)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ronxak/SESD-Project-Milestone-1.git
   cd SESD-Project-Milestone-1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/studyplanner
   JWT_SECRET=your_jwt_secret_here
   ```
   *(Or copy from `.env.example`: `cp .env.example .env`)*

4. **Run the application**:
   ```bash
   npm run dev
   ```
   Go to [http://localhost:5001](http://localhost:5001)

## API Documentation

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Subjects
*Requires Authorization Header: `Bearer <token>`*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/subjects` | Create a new subject |
| GET | `/api/subjects` | Get all subjects for the user |
| DELETE | `/api/subjects/:id` | Delete a specific subject |

### Tasks
*Requires Authorization Header: `Bearer <token>`*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks |
| PUT | `/api/tasks/:id` | Update task status/details |
| DELETE | `/api/tasks/:id` | Delete a task |

### Study Sessions
*Requires Authorization Header: `Bearer <token>`*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/sessions/start` | Start a new study session |
| GET | `/api/sessions` | View session history |
| PUT | `/api/sessions/:id/end` | End a session (calculates duration) |

## Testing

1. **Authentication**: First, register a user and then login to receive a JWT token.
2. **Setup Postman**:
   - Set the `Authorization` header to `Bearer <YOUR_TOKEN>`.
   - Use `Content-Type: application/json` for POST/PUT requests.
3. **Sequential Testing**:
   - Create a **Subject** first.
   - Create a **Task** linked to that Subject.
   - Start a **Session** to begin tracking time.
## Backend Architecture and Code Structure
The backend is implemented using a layered architecture to ensure scalability, maintainability, and separation of concerns.
The main layers include:
## Controllers
Handle incoming HTTP requests and return responses.
Example:
AuthController
TaskController
SubjectController
SessionController
## Services
Contain business logic and coordinate operations between controllers and repositories.
Example:
AuthService
TaskService
SubjectService
SessionService
## Repositories
Handle database operations and interact with MongoDB.
Example:
UserRepository
TaskRepository
SubjectRepository
SessionRepository
## Models
Define the database schema and structure of entities.
Example:
User
Subject
Task
StudySession
This architecture improves:
Code maintainability
Scalability
Separation of responsibilities
System clarity
## System Capabilities
The system supports:
Secure authentication using JWT tokens
Protected routes using authentication middleware
Persistent data storage in MongoDB
Structured relationships between entities
Clean and modular backend code organization
## Expected Outcome
A fully functional backend system that:
Demonstrates clean architecture principles
Implements secure authentication and authorization
Uses proper database schema design
Follows object-oriented and modular design principles
Reflects real-world backend development practices
## Development Timeline
Phase 1
Backend setup and MongoDB schema design
Phase 2
User authentication using JWT
Phase 3
Subject and task management implementation
Phase 4
Study session tracking implementation
Phase 5
Testing and GitHub deployment
## Additional Notes
The project follows a backend-first development approach
Focus is on backend architecture and system design
Frontend can be added later as a separate layer
Designed to demonstrate real-world backend engineering practices
## Deployment

This project is configured for deployment on platforms like Render, Heroku, or Vercel.

### Deployment Steps
1. **Repository**: Ensure all changes are pushed to GitHub.
2. **Environment Variables**: Set the following in your deployment dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or as required)
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A strong, unique secret key.
3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`

## 🌐 Live Project
https://study-planner-m08x.onrender.com

---

## Disclaimer
This project is designed as a backend system design and engineering learning project.
It focuses on demonstrating clean architecture, secure authentication, and structured backend implementation rather than frontend complexity.
