
# 🚀 Full-Stack User Management System

A production-grade full-stack web application built with **React, Node.js, Express, Sequelize ORM, and Microsoft SQL Server (MSSQL)**, featuring authentication, role-based access control, and a strictly separated validation architecture using **Yup (frontend)** and **Zod (backend)**.

---

## ✨ Key Highlights

- 🔐 Secure Authentication (Register / Login)
- 👤 Full User Management (CRUD Operations)
- 🧑‍💼 Admin Dashboard with advanced controls
- 🔍 Search, Sort, Pagination support
- ⚙️ Strict validation architecture (Yup + Zod separation)
- 🧠 Clean layered backend architecture (Controller → Service → DB)
- 🧩 Modular and reusable React components
- 📦 Sequelize ORM-based database design

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Hook Form
- Yup (Validation Layer)
- Axios
- CSS (Modular styling)

### Backend
- Node.js
- Express.js
- Sequelize ORM
- Zod (Validation Middleware)
- Microsoft SQL Server (MSSQL)

---

## 🧠 Architecture Design

```

Frontend Flow:
Form → Yup Validation → API Call → Backend

Backend Flow:
Request → Zod Middleware → Controller → Service → Database

```

---

## ⚡ Validation Strategy (STRICT RULE)

### Frontend
- ✔ Yup-only validation
- ✔ React Hook Form integration
- ❌ No manual validation logic

### Backend
- ✔ Zod schema validation via middleware
- ✔ Centralized request validation
- ❌ No validation inside controllers or services

---

## 📊 Features Overview

### 🔐 Authentication System
- User registration with validation
- Secure login system
- Session-safe user handling

### 👨‍💻 Admin Dashboard
- View all users
- Search users dynamically
- Sort by fields (username, email, phone, gender)
- Pagination support
- Edit & delete users via modals

### 👤 Profile Management
- Update user profile details
- Controlled edit mode
- Real-time validation feedback

---

## 🔌 API Structure

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
├── validation/
└── utils/

backend/
├── controllers/
├── services/
├── middleware/
├── validations/
├── sequelize/
└── routes/

````

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
````

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Setup

Create a `.env` file in backend:

```
DB_USER=
DB_PASSWORD=
DB_SERVER=
DB_NAME=
PORT=
```

---

## 🧠 Key Learnings

* Full-stack architecture design (React + Node)
* Strict separation of validation layers (Yup vs Zod)
* Scalable backend structure (Service-based architecture)
* Sequelize ORM database integration
* Real-world admin dashboard system design
* Clean API design with middleware validation

---

## ⭐ Project Status

✔ Production-ready structure
✔ Fully modular architecture
✔ Scalable validation system
✔ Clean separation of concerns

---

## 📌 Future Improvements

* JWT-based authentication upgrade
* Role-based permissions enhancement
* Docker integration
* Unit & integration testing
* Deployment pipeline (CI/CD)
