# 🎓 Scholarship Stream

**Scholarship Stream** is a full-stack web application designed to help students discover scholarships, apply online, and manage applications efficiently. It also provides powerful dashboards for Admins and Moderators to manage users, scholarships, applications, and payments.

---

## 🌐 Live Website

- 🔗 **Frontend (Netlify):** [https://scholarship-stream.netlify.app/](https://scholarship-stream.netlify.app/)  
- 🔗 **Backend (Vercel):** [https://scholarstream-server-alpha.vercel.app/](https://scholarstream-server-alpha.vercel.app/)  

---

## 🎯 Purpose

The main goals of this project are:  
- Simplify scholarship applications for students  
- Provide role-based dashboards (Student, Moderator, Admin)  
- Enable secure online payments with Stripe  
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
- Track application status (pending, processing, completed)  
- Moderators can manage applications  

### 💳 Payment Integration
- Stripe Checkout integration  
- Handle payment success & failure  
- Securely store payment records  

### 📊 Dashboard & Analytics
- Admin analytics overview (users, scholarships, revenue)  
- Role-based dashboard navigation  
- User, review, and application management  

---

## 🖼️ Screenshots

<p align="center">
  <img src="https://i.ibb.co/TM7hjrdr/Screenshot-2025-12-31-122233.png" width="48%" />
  <img src="https://i.ibb.co/XxNdDtR5/Screenshot-2025-12-31-122258.png" width="48%" />
</p>
<p align="center">
  <img src="https://i.ibb.co/s9tFPdqh/Screenshot-2025-12-31-122331.png" width="48%" />
  <img src="https://i.ibb.co/hxNfsq5j/Screenshot-2025-12-31-122518.png" width="48%" />
</p>
<p align="center">
  <img src="https://i.ibb.co/BKcJVdNR/Screenshot-2025-12-31-122409.png" width="48%" />
</p>

---

## 🛠️ Technologies Used

### Frontend
- React, React Router , Axios  
- Firebase Authentication  
- Tailwind CSS  
- SweetAlert2  

### Backend
- Node.js, Express.js, MongoDB (Atlas)  
- JSON Web Token (JWT)  
- Stripe Payment Gateway  
- dotenv, cors  

---

## 📦 NPM Packages Used

- `express`, `mongodb`, `jsonwebtoken`, `stripe`, `cors`, `dotenv`  
- `axios`, `firebase`, `react-router-dom`, `sweetalert2`  

---


## 💾 Installation & Run Locally

```bash
# Clone the repo
git clone https://github.com/TawhidulIslamRefat/Scholarship-Stream.git
cd Scholarship-Stream

# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run server
