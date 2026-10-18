# 🌸 Perfume Shop - Fullstack E-commerce Platform

A modern full-stack e-commerce website for discovering and purchasing perfumes online. The platform provides a user-friendly shopping experience and an administrative dashboard for managing products, users, and orders.

---

## ✨ Key Features

### Customer Features

- **User Authentication:** Register and log in to access customer features.
- **Product Browsing:** Explore perfume collections and view detailed product information.
- **Shopping Cart:** Add products to the cart and manage selected items.
- **Online Payment:** Support online payments through the VNPay payment gateway.
- **Product Details:** View product information, images, and pricing.
- **Responsive Interface:** Enjoy a modern shopping interface across different screen sizes.

### Administrative Features

- **Admin Dashboard:** Access a dedicated interface for managing the store.
- **Product Management:** Manage perfume products and their information.
- **User Management:** View and manage customer accounts.
- **Order Management:** Monitor and manage customer orders.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| UI Framework | Material UI (MUI) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Database ODM | Mongoose |
| Routing | React Router |
| Payment Gateway | VNPay |
| Package Manager | npm |
| Version Control | Git, GitHub |

---

## 🚀 Getting Started

Follow these instructions to run Perfume Shop on your local machine.

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB or a MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/plongbi/perfume-shop.git
cd perfume-shop
```

### 2. Set Up the Backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure the required environment variables.

Example:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```

Configure any additional environment variables required by the application, including VNPay credentials if applicable.

Start the backend server:

```bash
npm start
```

If the project does not define a start script, use the appropriate command configured in `server/package.json`.

### 3. Set Up the Frontend

Open a new terminal in the project root directory:

```bash
npm install
npm run dev
```

Vite will display the local development URL in the terminal, typically:

```text
http://localhost:5173
```

### 4. Access the Application

Open the local URL provided by Vite in your browser.

Make sure the backend server and database are configured correctly before using features that require API access.

---

## 📁 Project Structure

```text
perfume-shop/
├── public/                 # Static assets
├── server/                 # Backend application
│   ├── server.js           # Backend entry point
│   └── ...                 # Routes, models, and configuration
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── ...
│   └── main.jsx            # Frontend entry point, if applicable
├── index.html              # HTML entry point
├── package.json            # Frontend dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

*Note: The directory tree is a simplified overview. Actual file and folder names may differ depending on the current implementation.*

---

## 💳 Payment Integration

Perfume Shop integrates with the VNPay payment gateway to support online payment processing.

Payment functionality depends on the correct configuration of the VNPay credentials and backend payment endpoints. Use the appropriate testing environment when developing and testing payment flows.

---

## 🔐 Environment Configuration

For security reasons, never commit `.env` files containing database credentials, payment secrets, or other sensitive information to GitHub.

Keep your environment variables configured locally and ensure that secret files are excluded through `.gitignore`.

---

## 🎯 Project Objectives

- Develop a full-stack e-commerce platform for perfume products.
- Build a modern and intuitive user interface with React.
- Implement backend services and database integration.
- Provide product, customer, and order management functionality.
- Integrate an online payment gateway.
- Practice full-stack web development and software project management.
