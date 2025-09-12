# 🍽️ Restaurant Food Ordering API

A backend system for a restaurant food ordering application built with **Node.js, Express.js, MongoDB, and Mongoose**.  
It follows a modular **MVC architecture** for scalability and maintainability, with secure **JWT authentication** and role-based access control for **admins, staff, and customers**.

---

## 🚀 Features
- 🔐 **Authentication & Authorization**  
  - JWT-based authentication  
  - Role-based access control (Admin, Staff, Customer)  
  - Password hashing for security  

- 🏗️ **Restaurant Management**  
  - CRUD operations for Restaurants, Categories, Food Items, and Orders  
  - Manage restaurant workflow efficiently  

- ⚙️ **Secure API Development**  
  - Middleware-based validations  
  - Centralized error handling  
  - Optimized Mongoose schema design  

- 🧪 **Testing & Production Ready**  
  - APIs tested with Postman  
  - Error handling & validation for reliable deployment  

---



## ⚡ How It Works
1. **Authentication**  
   - Users sign up / log in using email & password  
   - JWT tokens are issued for secure API access  

2. **Role-Based Access**  
   - Admins: Manage restaurants, categories, food items, and staff  
   - Staff: Manage food items & handle orders  
   - Customers: Browse menu, place orders, track status  

3. **Restaurant Workflow**  
   - Admin creates restaurant, categories, and menu items  
   - Customers browse and place orders  
   - Staff updates order status (e.g., Pending → Preparing → Delivered)

     ---

## 🛠️ Tech Stack
- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB + Mongoose** – Database & ODM  
- **JWT** – Authentication  
- **Postman** – API testing  
