# 📚 Library Management System – Frontend

A responsive and user-friendly React application designed to manage library operations such as book lending, returns, and user management. This frontend interfaces seamlessly with the [Library-Management-BE](https://github.com/Frozen-Potato/Library-Management-BE) backend, providing a full-stack solution for library management.

[![Deployed with GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue?logo=github)](https://frozen-potato.github.io/fs16-front-end-lib/)

👉 **Live Demo**: [https://frozen-potato.github.io/fs16-front-end-lib/](https://frozen-potato.github.io/fs16-front-end-lib/)

---

## 🚀 Features

- **User Authentication**: Secure login and registration functionalities.
- **Book Management**: Add, edit, delete, and view books in the library.
- **User Management**: Manage library members and their borrowing activities.
- **Responsive Design**: Optimized for various devices and screen sizes.

---

## 🛠️ Technologies Used

### 📦 Frontend  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)  
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)  
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)

### 🔧 Backend ([Library-Management-BE](https://github.com/Frozen-Potato/Library-Management-BE))  
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)  
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

### ⚙️ CI/CD  
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI--CD-blue?logo=github-actions&logoColor=white)

---

## 🧩 Backend Integration

This frontend communicates with the [Library-Management-BE](https://github.com/Frozen-Potato/Library-Management-BE) backend API.


## 🧑‍💻 Getting Started with Frontend
Prerequisites

    Node.js (v14 or above)

    npm or yarn

Installation

Clone the frontend repository:
```
git clone https://github.com/Frozen-Potato/Library-Management-FE.git
cd Library-Management-FE
```

Install dependencies:

```
    npm install
    # or
    yarn install
```
Configure environment variables:
Create a .env file and add:
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```
Run the app:
```
    npm start
    # or
    yarn start
```
    App runs at http://localhost:3000/

## 📁 Project Structure

```
Library-Management-FE/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 📌 License

This project is licensed under the MIT License.
