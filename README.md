# Skipy - The Ultimate Booking Management Solution


## 🚀 Overview
Skipy is a **powerful and flexible booking management system** that allows businesses such as **restaurants, barbers, spas, and other service-based industries** to manage their reservations efficiently. 

Unlike other solutions that focus on a single industry, Skipy provides a **unified booking platform** where merchants can manage **bookings, availability, and menus** all in one place.

---

## 🎯 Features
- ✅ **Merchant Dashboard** – Manage bookings, menus, and availability settings dynamically.
- ✅ **Role-Based Authorization** – Secures API access, ensuring only **merchant users** can modify data.
- ✅ **Real-Time Notifications (Socket.IO)** – Instantly updates merchant users on new or modified bookings.
- ✅ **Menu Management** – Merchants can **add, update, delete** menu items and upload images.
- ✅ **Dynamic Availability Settings** – Merchants can configure **open hours** dynamically.
- ✅ **Docker Support** – Deploy easily using **Docker & Docker Compose**.
- ✅ **Scalable & Secure** – Built with **Node.js, Express, MongoDB, Redis, and Socket.IO**.

---

## 📦 Getting Started

### 🔹 Clone the Repository
```sh
git clone https://github.com/wenyupeng/sit725-skipy
cd sit725-skipy
```

### 🔹 Setup Environment Variables
Copy `.env.example` and rename it to `.env`:
```sh
cp .env.example .env
```
Edit the `.env` file and update the values accordingly.

### 🔹 Install Dependencies
```sh
npm install
```

### 🔹 Run the Application
```sh
npm start
```

### 🔹 Run with Docker
If you prefer using Docker, build and start the container:
```sh
docker-compose up --build -d
```

---

## ⚙️ Environment Variables

The following environment variables are required for Skipy:

| Variable        | Description |
|----------------|-------------|
| `NODE_ENV`     | Set to `production` or `development` |
| `APP_HOST`     | Application host (default: `localhost`) |
| `APP_PORT`     | Application port (default: `3000`) |
| `MONGO_URL`    | MongoDB connection string |
| `REDIS_URL`    | Redis connection string |
| `SIGN_KEY`     | Secret key for authentication |
| `EMAIL_ACCOUNT` | Email for notifications |
| `EMAIL_PASSWORD` | Email password |

---


## 🛠️ Built With
- **Backend:** Node.js, Express.js, MongoDB, Redis, Socket.IO
- **Frontend:** EJS, Materialize CSS, jQuery
- **Authentication:** JWT-based role-based authorization
- **Deployment:** Docker, Docker Compose

---

## ✅ Running Tests
To run unit tests using **Mocha & Chai**, execute:
```sh
npm test
```

To run tests inside **Docker**, use:
```sh
docker-compose run app npm test
```

---

## 📜 License
Skipy is released under the **MIT License**. Feel free to use and modify it as needed.
