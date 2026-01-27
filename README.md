# 🎓 Scholar - Point

Scholarship Stream is a full-stack web application designed to help students discover scholarships, apply online, and manage applications efficiently. It also provides powerful dashboards for Admins and Moderators to manage users, scholarships, applications, and payments.

---

## 🌐 Live Website

🔗 **Frontend (Netlify):**  
(https://scholar-point.netlify.app/)

🔗 **Backend (Vercel):**  
https://scholarpoint-server.vercel.app/

---

## 🎯 Purpose of the Project

The main purpose of this project is to:

- Simplify the scholarship application process for students
- Provide role-based dashboards (Student, Moderator, Admin)
- Enable secure online payments using Stripe
- Offer analytics and management tools for administrators

---

## ✨ Key Features

### 👤 Authentication & Authorization

- Firebase Authentication (Email/Password)
- JWT-based secure API access
- Role-based access control (Student, Moderator, Admin)

### 🎓 Scholarship Management

- View all scholarships with search, filter, sort, and pagination
- Scholarship details with reviews
- Admin can add, update, and delete scholarships

### 📝 Application System

- Students can apply for scholarships
- Application status tracking (pending, processing, completed)
- Moderators can manage applications

### 💳 Payment Integration

- Stripe Checkout integration
- Payment success & failure handling
- Payment records stored securely in database

### 📊 Dashboard & Analytics

- Admin analytics overview (users, scholarships, revenue)
- Role-based dashboard navigation
- User, review, and application management

---

## 🛠️ Technologies Used

### Frontend

- React
- React Router DOM
- Axios
- Firebase Authentication
- Tailwind CSS
- SweetAlert2

### Backend

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JSON Web Token (JWT)
- Stripe Payment Gateway
- dotenv
- cors

---

## 📦 NPM Packages Used

### Showcasing Important Packages

- `express`
- `mongodb`
- `jsonwebtoken`
- `stripe`
- `cors`
- `dotenv`
- `axios`
- `firebase`
- `react-router-dom`
- `sweetalert2`

---

## 🚀 How to Run Locally

### Frontend

```bash
npm install
npm run dev
```
