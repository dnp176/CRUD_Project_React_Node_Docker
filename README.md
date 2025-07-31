# CRUD Project (React + Node + MongoDB + Docker)

This project is a simple **CRUD application** built using **React (Frontend)**, **Node.js (Backend)**, **MongoDB (Database)**, and **Docker** for containerization.

---

## ✅ Features
- Create, Read, Update, and Delete items
- REST API with Express.js
- MongoDB integration
- Docker support for easy deployment
- Environment-based configuration

---

## 🔑 Environment Variables
Create a `.env` file in the root directory with the following:
`
PORT=5000 \n
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DB=mydb
MONGO_COLLECTION=items
NODE_ENV=development
VITE_API_URL=http://<your-server-ip-or-localhost>/api
`


### ⚠ Important:
- If running **locally**, set:
VITE_API_URL=http://localhost:5000/api

- If running on **cloud (e.g., AWS, DigitalOcean)**, set:
VITE_API_URL=http://<your-public-IP>/api


---

## 🚀 Getting Started

### 1. **Clone the Repository**
- git clone https://github.com/dnp176/CRUD_Project_React_Node_Docker.git
- cd CRUD_Project_React_Node_Docker


### 2. **Set up Environment**
Create a `.env` file in the root directory (use the template above).

---

### 3. **Run with Docker**
docker-compose up --build


This will:
- Build and run the backend, frontend, and MongoDB containers.
- **Backend:** [http://localhost:5000/api](http://localhost:5000/api)
- **Frontend:** [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## ✅ Access the Application
- **Frontend:** http://localhost:5173  
- **API (Backend):** http://localhost:5000/api

---

## 📦 Docker Containers
- **frontend** → React app  
- **backend** → Node.js API  
- **mongo** → MongoDB database  

---

## 🌐 Deployment
- Update `VITE_API_URL` in `.env` file to your **public IP or domain**:
VITE_API_URL=http://your-cloud-ip/api

- Rebuild and run in detached mode:

---

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose

---

✅ **Done! Your CRUD app is ready to use.**

