node

-------

1.	Create a simple "Counter" component that increments a value when a button is clicked using ReactJS.

Counter.js.

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Counter: {count}</h1>
      <button 
        onClick={handleIncrement} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Increment
      </button>
    </div>
  );
}

export default Counter;
 
App.js 
import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}
      export default App;

2.	Write a program to demonstrate to pass data from a parent component to a child component using props using ReactJS.
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const message = "Hello from Parent!"; // Data to pass to child component

  return (
    <div>
      <h1>Parent Component</h1>
      {/* Passing 'message' as a prop to the ChildComponent */}
      <ChildComponent message={message} />
    </div>
  );
};

export default ParentComponent;

// ChildComponent.js
import React from 'react';

// Receiving props in the child component
const ChildComponent = ({ message }) => {
  return (

};

export default ChildComponent;

// App.js
import React from 'react';
import ParentComponent from './ParentComponent';

const App = () => {
  return (
    <div>
      <ParentComponent />
    </div>
  );
};

export default App;    <div>
      <h2>Child Component</h2>
      <p>Message from Parent: {message}</p>
    </div>
  );
3.	Write a program to handle form input and submit the form data in React.
// Import React and useState from React
import React, { useState } from 'react';

const FormComponent = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to store submission status
  const [submissionStatus, setSubmissionStatus] = useState('');

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
    e.preventDefault();

    // Simulate form submission (e.g., send to an API)
    console.log('Form Data Submitted:', formData);
    setSubmissionStatus('Form submitted successfully!');

    // Clear form inputs
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </label>
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </label>
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              rows="4"
              required
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>

      {/* Submission Status */}
      {submissionStatus && (
        <p style={{ marginTop: '20px', color: 'green' }}>{submissionStatus}</p>
      )}
    </div>
  );
};

export default FormComponent;
4.	Write a program using Node.js ,MySQL to create registration page .The page should accept username, email, password, and confirm password. Hash passwords using bcrypt. 
npm install express body-parser mysql bcrypt
node app.js
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "", // replace with your MySQL password
  database: "user_registration", // replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Create users table if not exists
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table ready.");
    }
  }
);

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: "Email already exists." });
        }
        return res.status(500).json({ error: "Database error." });
      }
      res.status(201).json({ message: "User registered successfully." });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
5.	Write a program using Node.js, MySQL to create registration page .The page should accept username, email, password, and confirm password. Upon successful login, display a welcome message. 
// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create users table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) throw err;
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required /><br />
      <input type="email" name="email" placeholder="Email" required /><br />
      <input type="password" name="password" placeholder="Password" required /><br />
      <input type="password" name="confirm_password" placeholder="Confirm Password" required /><br />
      <button type="submit">Register</button>
    </form>

    <h2>Login</h2>
    <form action="/login" method="POST">
      <input type="email" name="email" placeholder="Email" required /><br />
      <input type="password" name="password" placeholder="Password" required /><br />
      <button type="submit">Login</button>
    </form>
  `);
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.send('Passwords do not match.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.send('Email already exists.');
      }
      return res.send('Error registering user.');
    }
    res.send('Registration successful! You can now log in.');
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.send('Error logging in.');

    if (results.length === 0) {
      return res.send('User not found.');
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send('Invalid credentials.');
    }

    req.session.user = user;
    res.send(`Welcome, ${user.username}!`);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
6.	Write a program using Node.js, MySQL to create registration page. The page should accept username, email, password, and confirm password. Store user data in a users MySQL table.
CREATE DATABASE user_management;
// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create users table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) throw err;
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required /><br />
      <input type="email" name="email" placeholder="Email" required /><br />
      <input type="password" name="password" placeholder="Password" required /><br />
      <input type="password" name="confirm_password" placeholder="Confirm Password" required /><br />
      <button type="submit">Register</button>
    </form>

    <h2>Login</h2>
    <form action="/login" method="POST">
      <input type="email" name="email" placeholder="Email" required /><br />
      <input type="password" name="password" placeholder="Password" required /><br />
      <button type="submit">Login</button>
    </form>
  `);
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.send('Passwords do not match.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.send('Email already exists.');
      }
      return res.send('Error registering user.');
    }
    res.send('Registration successful! You can now log in.');
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.send('Error logging in.');

    if (results.length === 0) {
      return res.send('User not found.');
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send('Invalid credentials.');
    }

    req.session.user = user;
    res.send(`Welcome, ${user.username}!`);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
7.	Write a program using Node.js, MySQL to add employee details in employees MySQL table. Employees should have fields like name, designation, salary, and department. (POST /employees).
CREATE DATABASE company;

USE company;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department VARCHAR(100) NOT NULL
);
 (server.js):
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Update with your MySQL username
  password: '',         // Update with your MySQL password
  database: 'company'   // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// POST endpoint to add an employee
app.post('/employees', (req, res) => {
  const { name, designation, salary, department } = req.body;

  if (!name || !designation || !salary || !department) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO employees (name, designation, salary, department) VALUES (?, ?, ?, ?)';
  db.query(query, [name, designation, salary, department], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to add employee' });
    }
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
8.	Write a program using Node.js, MySQL to list employee details in employees MySQL table. Employees should have fields like name, designation, salary, and department. (GET CREATE DATABASE company;

USE company;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  designation VARCHAR(100),
  salary DECIMAL(10, 2),
  department VARCHAR(100)
);
Node.js Code:
// Required modules
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'company'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the GET /employees route
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  
  // Execute the query to get all employee details
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Failed to fetch employee data' });
    } else {
      res.json(results);
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
9.	Write a program using Node.js, Express, and MySQL to update employee details in employees MySQL table. Employees should have fields like name, designation, salary, and department. (PUT /employees/:id). 
CREATE DATABASE company;

USE company;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  designation VARCHAR(100),
  salary DECIMAL(10, 2),
  department VARCHAR(100)
);
Node.js Code to Update Employee Details:
// Required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'company'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the PUT /employees/:id route to update employee details
app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const { name, designation, salary, department } = req.body;

  if (!name || !designation || !salary || !department) {
    return res.status(400).json({ error: 'All fields (name, designation, salary, department) are required.' });
  }

  const query = 'UPDATE employees SET name = ?, designation = ?, salary = ?, department = ? WHERE id = ?';

  // Execute the query to update the employee's details
  db.query(query, [name, designation, salary, department, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'Failed to update employee details' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee details updated successfully' });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

10.	Write a program using Node.js, Express, and MySQL to delete employee details in employees MySQL table. Employees should have fields like name, designation, salary, and department. (DELETE /employees/:id). 
CREATE DATABASE company;

USE company;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  designation VARCHAR(100),
  salary DECIMAL(10, 2),
  department VARCHAR(100)
);
Node.js Code to Delete Employee Details:
// Required modules
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'company'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the DELETE /employees/:id route to delete employee details
app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  const query = 'DELETE FROM employees WHERE id = ?';

  // Execute the query to delete the employee by ID
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Failed to delete employee' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

11.	Develop a product catalog for an e-commerce application using Node.js and MySQL. Store product details such as name, price, category, description, and stock in a MySQL table. Create API routes to List all products (GET /products). 
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  category VARCHAR(100),
  description TEXT,
  stock INT
);
Node.js Packages: Install the required npm packages:
npm install express mysql2
Node.js Code:
// Required modules
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'ecommerce'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the GET /products route to list all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';

  // Execute the query to get all products
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }

    res.json(results);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

12.	Develop a product catalog for an e-commerce application using Node.js and MySQL. Store product details such as name, price, category, description, and stock in a MySQL table. Create API routes to get details of a specific product (GET /products/:id). 
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  category VARCHAR(100),
  description TEXT,
  stock INT
);
Node.js Packages: Install the necessary npm packages:
npm install express mysql2
Node.js Code to Retrieve a Specific Product:
// Required modules
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'ecommerce'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the GET /products/:id route to fetch a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM products WHERE id = ?';

  // Execute the query to get the product by ID
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]); // Return the first (and only) result as it's the specific product
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

13.	 Develop a product catalog for an e-commerce application using Node.js and MySQL. Store product details such as name, price, category, description, and stock in a MySQL table. Create API routes to Add a new product (POST /products). 
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  category VARCHAR(100),
  description TEXT,
  stock INT
);
Node.js Packages: Install the necessary npm packages:
npm install express mysql2 body-parser
Node.js Code to Add a New Product:
// Required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'ecommerce'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the POST /products route to add a new product
app.post('/products', (req, res) => {
  const { name, price, category, description, stock } = req.body;

  // Validate the required fields
  if (!name || !price || !category || !description || !stock) {
    return res.status(400).json({ error: 'All fields (name, price, category, description, stock) are required.' });
  }

  const query = 'INSERT INTO products (name, price, category, description, stock) VALUES (?, ?, ?, ?, ?)';

  // Execute the query to insert the new product into the products table
  db.query(query, [name, price, category, description, stock], (err, results) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Failed to add product' });
    }

    res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

14. Develop a product catalog for an e-commerce application using Node.js and MySQL. Store product details such as name, price, category, description, and stock in a MySQL table. Create API routes to Update a product’s stock or price (PUT /products/:id).
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    stock INT NOT NULL
);
2. Set up Node.js Application
a. Install necessary dependencies:
Run the following commands to set up the project and install required packages:
mkdir ecommerce-app
cd ecommerce-app
npm init -y
npm install express mysql2 body-parser
b. Create a basic Express server:
In the ecommerce-app directory, create a file called server.js:
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL user
  password: '', // Update with your MySQL password
  database: 'ecommerce'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// API routes

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Update a product's stock or price
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { price, stock } = req.body;

  if (price !== undefined && stock !== undefined) {
    db.query(
      'UPDATE products SET price = ?, stock = ? WHERE id = ?',
      [price, stock, id],
      (err, results) => {
        if (err) {
          res.status(500).send('Database error');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Product not found');
        } else {
          res.send('Product updated successfully');
        }
      }
    );
  } else {
    res.status(400).send('Price and stock must be provided');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

15. Develop a product catalog for an e-commerce application using Node.js and MySQL. Store product details such as name, price, category, description, and stock in a MySQL table. Create API routes to Delete a product (DELETE /products/:id). 
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    stock INT NOT NULL
);
npm install express mysql2 body-parser
Create or update server.js:
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL user
  password: '', // Update with your MySQL password
  database: 'ecommerce'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// API routes

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Update a product's stock or price
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { price, stock } = req.body;

  if (price !== undefined && stock !== undefined) {
    db.query(
      'UPDATE products SET price = ?, stock = ? WHERE id = ?',
      [price, stock, id],
      (err, results) => {
        if (err) {
          res.status(500).send('Database error');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Product not found');
        } else {
          res.send('Product updated successfully');
        }
      }
    );
  } else {
    res.status(400).send('Price and stock must be provided');
  }
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Product not found');
    } else {
      res.send('Product deleted successfully');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

16. Write a program using Node.js and MySQL. Store students’ information (name, roll number, class, and grade) in a MySQL students table. Create API routes to Add a student (POST /students). 
CREATE DATABASE school;

USE school;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    class VARCHAR(50),
    grade VARCHAR(10)
);
2. Set up Node.js Application
Install the necessary dependencies and set up the basic Node.js application.
a. Initialize Node.js Project:
mkdir school-app
cd school-app
npm init -y
npm install express mysql2 body-parser
b. Create the server.js File:
Create a file called server.js in the root directory (school-app) and add the following code:
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'school'
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// API Routes

// POST /students - Add a new student
app.post('/students', (req, res) => {
  const { name, roll_number, class, grade } = req.body;

  if (!name || !roll_number || !class || !grade) {
    return res.status(400).send('All fields (name, roll number, class, grade) are required');
  }

  const query = 'INSERT INTO students (name, roll_number, class, grade) VALUES (?, ?, ?, ?)';
  db.query(query, [name, roll_number, class, grade], (err, results) => {
    if (err) {
      console.error('Error inserting student:', err);
      return res.status(500).send('Database error');
    } else {
      res.status(201).send('Student added successfully');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

17. Write a program using Node.js and MySQL. Store students’ information (name, roll number, class, and grade) in a MySQL students table. Create API routes to Update a student's grade (PUT /students/:rollNumber). 
CREATE DATABASE school;

USE school;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    class VARCHAR(50),
    grade VARCHAR(10)
);
2. Set up Node.js Application
Install the necessary dependencies and set up the basic Node.js application.
a. Initialize Node.js Project:
mkdir school-app
cd school-app
npm init -y
npm install express mysql2 body-parser
b. Create the server.js File:
Create a file called server.js in the root directory (school-app) and add the following code:
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'school'
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// API Routes

// PUT /students/:rollNumber - Update a student's grade
app.put('/students/:rollNumber', (req, res) => {
  const { rollNumber } = req.params;
  const { grade } = req.body;

  if (!grade) {
    return res.status(400).send('Grade is required');
  }

  // Update the grade of the student with the specified roll number
  const query = 'UPDATE students SET grade = ? WHERE roll_number = ?';
  db.query(query, [grade, rollNumber], (err, results) => {
    if (err) {
      console.error('Error updating student grade:', err);
      return res.status(500).send('Database error');
    } else if (results.affectedRows === 0) {
      // If no rows are affected, the student was not found
      res.status(404).send('Student not found');
    } else {
      res.send('Student grade updated successfully');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

18. Write a program using Node.js and MySQL. Store students’ information (name, roll number, class, and grade) in a MySQL students table. Create API routes to Get all students and their grades (GET /students) give 1 by 1 seprately full code in easy way
CREATE DATABASE school;

USE school;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    class VARCHAR(50),
    grade VARCHAR(10)
);
2. Set up the Node.js Application
Step 1: Initialize the Node.js Project
Open your terminal and run the following commands to set up the project:
mkdir school-app
cd school-app
npm init -y
npm install express mysql2 body-parser
Step 2: Create server.js File
In your school-app directory, create a file called server.js. This will be the main file for your Node.js application.
// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'school' // Database name
});

// Connect to MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Stop the app if the database connection fails
  } else {
    console.log('Connected to the database');
  }
});

// API Route to Get All Students and Their Grades (GET /students)
app.get('/students', (req, res) => {
  const query = 'SELECT name, roll_number, class, grade FROM students';

  // Execute the query to fetch students
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).send('Database error');
    }

    // Send the list of students as the response
    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

