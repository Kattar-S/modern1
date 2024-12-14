Ans
3.Write a program to handle form input and submit the form data in React.

####app.js

------------
import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form submitted:', formData);
    alert(`Form submitted successfully!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);

    // Reset form fields
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="App">
      <h2>React Form Handling Example</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name: 
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Email: 
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Message: 
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;


###app.css

.App {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

---------------------------------------------------------------------------
4.Write a program using Node.js ,MySQL to create registration page .The page should accept username, email, password, and confirm password. Hash passwords using bcrypt

-- Create the database
CREATE DATABASE user_registration;

-- Switch to the database
USE user_registration;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);



//index.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mubin@29",
  database: "user_auth",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
  if (req.session.userId) {
    res.send(`
            <h1>Welcome back!</h1>
            <button onclick="location.href='/logout'">Logout</button>
            <br>
            <button onclick="location.href='/profile'">Go to Profile</button> <!-- Example of another page -->
        `);
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out!");
    }
    res.redirect("/");
  });
});

app.get("/profile", (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + "/public/profile.html");
  } else {
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  if (req.session.userId) {
    res.send(`
            <h1>Welcome back!</h1>
            
        `);
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.post("/register", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send("Passwords do not match!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.send("Error occurred: " + err);
      }
      res.send("User registered successfully!");
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.send("Error occurred: " + err);
      }
      if (results.length > 0) {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          req.session.userId = user.id;
          res.send(`
                    <h1>Welcome ${user.username}!</h1>
                    <button onclick="location.href='/logout'">Logout</button>
            <br>
            <button onclick="location.href='/profile'">Go to Profile</button>`);
        } else {
          res.send("Invalid password!");
        }
      } else {
        res.send("User not found!");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


------------------------------------------------------------------
under public folder
index.html



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration and Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 300px;
            text-align: center;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 14px;
        }
        button {
            background-color: #5cb85c;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
            margin-top: 10px;
        }
        button:hover {
            background-color: #4cae4c;
        }
        .form-divider {
            margin: 20px 0;
            font-size: 14px;
        }
        .form-divider span {
            background-color: #f2f2f2;
            padding: 0 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Register</h1>
        <form action="/register" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
        </form>

        <div class="form-divider">
            <span>OR</span>
        </div>

        <h1>Login</h1>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
