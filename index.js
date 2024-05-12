const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path=require('path');
require('dotenv').config();

const app = express();

// Middleware for parsing JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for serving static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).redirect('/');
  }
};
//connect to databse
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });

//serve pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html');
  });

app.get('/core', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/pages/core.html');
  });

app.get('/member', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/pages/member.html');
  });

app.get('/team', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/pages/team.html');
  });

//APIs
app.post('/login', (req, res) => {
  // In a real application, you would validate credentials against a database
//   if(database authentication is successful){
//     req.session.user = "abc"; // Store username in session
//     res.status(200).json({userEmail:email});
//   }
//   else{
//     res.status(200).send('Login successful');

//   }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Error logging out');
    } else {
      res.send('Logout successful');
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
