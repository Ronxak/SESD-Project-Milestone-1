# Fix Plan - TODO List

## 1. tsconfig.json
- [x] Add skipLibCheck: true
- [x] Add resolveJsonModule: true
- [x] Add moduleResolution: "node"

## 2. src/config/db.ts
- [x] Add validation for MONGO_URI environment variable

## 3. src/models/User.ts
- [x] Add select: false to password field for security

## 4. src/middlewares/auth.middleware.ts
- [x] Handle "Bearer " prefix in token extraction

## 5. src/services/auth.service.ts
- [x] Add JWT token expiration time

## 6. All repositories (user, subject, task, session)
- [x] Make all methods async

## 7. src/services/session.service.ts
- [x] Add end method to complete sessions with duration calculation

## 8. src/controllers/session.controller.ts
- [x] Add end endpoint

## 9. src/routes/session.routes.ts
- [x] Add end route

## 10. src/models/StudySession.ts
- [x] Make userId and subjectId required

