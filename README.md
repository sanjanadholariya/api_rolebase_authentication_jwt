# Role-based Authentication API (JWT)

A production-ready Node.js + Express backend implementing secure JWT authentication, role-based access control, and MongoDB database system. This API enables managing users with different roles such as **Admin & User**, providing protected route handling.

---

## 🚀 Features

✅ User Registration & Login (JWT)
✅ Role-based Access (Admin/User)
✅ Protected Routes
✅ Password Hashing (bcrypt)
✅ MongoDB + Mongoose Models
✅ Modular MVC Structure
✅ Environment-based Config
✅ Error Handling
✅ Postman Collection Included

---

## 🛠️ Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Backend  | Node.js, Express.js |
| Database | MongoDB, Mongoose   |
| Auth     | JWT, bcrypt         |
| Tools    | Postman, Nodemon    |

---

## 📁 Folder Structure

```
project-folder/
 ├─ src/
 │   ├─ config/
 │   ├─ controller/
 │   ├─ middleware/
 │   ├─ model/
 │   ├─ routes/
 │   └─ utils/
 ├─ .env
 └─ package.json
 
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sanjanadholariya/api_rolebase_authentication_jwt
```

### 2️⃣ Move inside project folder

```bash
cd api_rolebase_authentication_jwt
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Setup environment variables

Create a `.env` file:

```
PORT=8001
MONGO_URL=mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/role_base_api
JWT_SECRET=testing
```

### 5️⃣ Start project

```bash
npm run dev
```

---

## 🔐 API Endpoints

Detailed endpoints available in Postman collection.

---

## 👩‍💻 Author

**Sanjana Dholariya**

GitHub: https://github.com/sanjanadholariya
