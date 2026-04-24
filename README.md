# 🚀 Full-Stack User Management System

A production-ready full-stack web application built with **React, Node.js, Express, Sequelize ORM, and Microsoft SQL Server (MSSQL)**.
This system implements secure authentication, role-based access control, and a strictly separated validation architecture using **Yup (frontend)** and **Zod (backend)**.

---

## ✨ Key Features

* 🔐 JWT-based Authentication (Register / Login)
* 👤 Complete User Management (CRUD Operations)
* 🧑‍💼 Role-based Access Control (Admin / User)
* 🔍 Search, Sorting, and Pagination
* ⚙️ Strict Validation Architecture (Yup + Zod separation)
* 🧠 Clean Backend Architecture (Controller → Service → DB)
* 🧩 Modular and reusable React components
* 📦 Sequelize ORM with MSSQL integration

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* React Hook Form
* Yup (Validation Layer)
* Axios
* Modular CSS

### Backend

* Node.js
* Express.js
* Sequelize ORM
* Zod (Validation Middleware)
* Microsoft SQL Server (MSSQL)

---

## 🧠 Architecture Overview

### Frontend Flow

```
Form → Yup Validation → API Call → Backend
```

### Backend Flow

```
Request → Zod Middleware → Controller → Service → Database
```

---

## ⚡ Validation Strategy (Strict Separation)

### Frontend

* ✔ Yup-only validation
* ✔ Integrated with React Hook Form
* ❌ No manual validation logic

### Backend

* ✔ Zod schema validation via middleware
* ✔ Centralized validation handling
* ❌ No validation inside controllers or services

---

## 🔐 Authentication

* JWT-based authentication
* Token stored and managed on client
* Role normalization handled centrally
* Secure login and registration flow

---

## 📊 Features Overview

### 👨‍💻 Admin Dashboard

* View all users
* Search users dynamically
* Sort by multiple fields (username, email, phone, gender)
* Pagination support
* Edit & delete users using modals

### 👤 User Features

* Profile management
* Controlled edit mode
* Real-time validation feedback

---

## 🔌 API Endpoints

### Auth Routes

```
POST /register
POST /login
```

### User Routes

```
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

---

## 🧱 Project Structure

```
frontend/
├── components/
├── pages/
├── services/
├── utils/
├── validation/

backend/
├── controllers/
├── services/
├── middleware/
├── validations/
├── sequelize/
├── routes/
├── common/
├── utils/
├── constants/
```

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/RemyAthisayaa17/auth-app.git
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
node server.js
```

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```
DB_USER=
DB_PASSWORD=
DB_SERVER=
DB_NAME=
PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
```

---

## 🧠 Key Learnings

* Full-stack architecture design (React + Node)
* Strict validation separation (Yup vs Zod)
* Service-based backend architecture
* Sequelize ORM with MSSQL integration
* Role-based access control implementation
* Clean API design using middleware validation

---

## ⭐ Project Status

✔ Production-ready structure
✔ Modular and scalable architecture
✔ Clean separation of concerns
✔ JWT authentication implemented

---

## 📌 Future Improvements

* Refresh token mechanism
* Docker containerization
* Unit & integration testing
* CI/CD pipeline setup
