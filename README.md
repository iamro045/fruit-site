# Groott - Fresh Fruit E-Commerce Store 🍏🍎

Groott is a modern, full-stack e-commerce web application built specifically for browsing and purchasing fresh fruits. It features a responsive UI, secure user authentication, shopping cart functionality, and an admin dashboard for managing inventory.

## 🚀 Tech Stack

This project is built using the **MERN** stack:

*   **Frontend:** React.js (Vite), React Router DOM, Custom CSS (Glassmorphism UI)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
*   **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ✨ Features

### For Users
*   **Secure Authentication:** Sign up, log in, and securely manage sessions using JWT.
*   **Browse Products:** View a dynamic catalog of fresh fruits pulled from the database.
*   **Shopping Cart:** Add, remove, and update quantities of items before checkout.
*   **Order Tracking:** View past order history and current order status.
*   **Responsive Design:** Optimized for both mobile and desktop viewing.

### For Administrators
*   **Role-Based Access:** Dedicated admin routes protected by middleware.
*   **Inventory Management:** Add, edit, or delete fruit listings directly from the dashboard.
*   **Order Management:** View all user orders and update their delivery status (e.g., Processing, Shipped, Delivered).

---

## 📂 Project Structure

The project is organized into two distinct repositories (or folders) to separate the client and server concerns.
```text
GROOTT/
├── fruit-backend/       # Node/Express API Server
│   ├── controllers/     # Route logic (Auth, Products, Orders)
│   ├── middleware/      # JWT verification, Admin checks
│   ├── models/          # Mongoose Schemas (User, Fruit, Order)
│   ├── routes/          # Express route definitions
│   └── server.js        # Main entry point
│
└── fruit-site/          # React Frontend (Vite)
    ├── src/
    │   ├── api.js       # Axios instance with interceptors
    │   ├── components/  # Reusable UI elements (Navbar, Cart, etc.)
    │   ├── context/     # React Context (AuthContext for global state)
    │   └── pages/       # Route components (Home, Login, Admin, etc.)
    └── vercel.json      # Configuration for Vercel deployment routing

