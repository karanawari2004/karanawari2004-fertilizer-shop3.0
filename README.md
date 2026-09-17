# 🌱 Fertilizer Shop Application

A web-based **Fertilizer Shop Application** built using **Node.js, Express.js, EJS, and MySQL**. The application allows users to browse fertilizer products and view detailed information about each product.

## 🚀 Live Demo

🔗 **Live Application:**
https://karanawari2004-fertilizer-shop3-0-4.onrender.com/

## 📌 Project Overview

The Fertilizer Shop Application is a web application developed to provide information about different fertilizers in an easy-to-use interface.

Users can browse fertilizer products and view important information such as:

* Fertilizer name
* Fertilizer type
* Advantages
* Contents
* Price
* Product image

The backend is developed using **Node.js and Express.js**, while **MySQL** is used to store fertilizer product information. **EJS** is used for server-side rendering.

## ✨ Features

* 🌱 View fertilizer products
* 🔍 View detailed fertilizer information
* 💰 Display fertilizer prices
* 🧪 Display fertilizer contents
* 📝 Display fertilizer advantages
* 🖼️ Product images
* 🗄️ MySQL database integration
* ⚡ Express.js backend
* 📄 EJS server-side rendering
* 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* EJS
* Bootstrap
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Tools

* Git
* GitHub
* VS Code
* Postman

## 📂 Project Structure

```text
Fertilizer-Shop/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── home.ejs
│   ├── product.ejs
│   └── ...
│
├── routes/
│   └── ...
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

> The exact folder structure may vary depending on the project implementation.

## 🗄️ Database

The application uses **MySQL** to store fertilizer product information.

### Fertilizer Table

The database contains fields such as:

| Field        | Description                |
| ------------ | -------------------------- |
| `id`         | Unique product ID          |
| `name`       | Fertilizer name            |
| `type`       | Type of fertilizer         |
| `advantages` | Benefits of the fertilizer |
| `contents`   | Fertilizer contents        |
| `photo`      | Product image              |
| `price`      | Product price              |
| `product`    | Product information        |

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd Fertilizer-Shop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MySQL

Create a MySQL database and configure the database connection according to your project.

Example:

```javascript
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "your_database"
});
```

Replace the values with your own MySQL configuration.

### 5. Start the application

```bash
node app.js
```

The application will run locally on:

```text
http://localhost:3006
```

## 🔐 Environment Variables

For better security, database credentials should be stored using environment variables.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3006
```

> Never upload passwords, API keys, or `.env` files containing sensitive information to GitHub.

## 📡 Backend

The application uses **Express.js** to handle server-side requests and communicate with the MySQL database.

The backend handles:

* Product data
* MySQL database connection
* Application routes
* Product details
* EJS page rendering

## 🌐 Deployment

The application is deployed on **Render**.

🔗 **Live Project:**
https://karanawari2004-fertilizer-shop3-0-4.onrender.com/

## 🎯 Learning Outcomes

By developing this project, I gained practical experience in:

* Node.js
* Express.js
* EJS
* MySQL
* Backend development
* Database connectivity
* CRUD concepts
* Server-side rendering
* REST API concepts
* Git and GitHub
* Web application deployment

## 🔮 Future Improvements

Possible future improvements include:

* 👤 User authentication
* 🛒 Shopping cart
* 💳 Online payment
* 📦 Order management
* 🔐 Admin dashboard
* 🔎 Product search and filtering
* 📊 Inventory management
* ⭐ Product reviews and ratings

## 👨‍💻 Author

**Karan Awari**

B.Sc. Computer Science Graduate | MERN Stack Developer

### Skills

* HTML5
* CSS3
* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* MySQL
* Bootstrap
* Git
* GitHub

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
