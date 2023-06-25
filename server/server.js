// Dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;  // If port not set, defaults to 5000
const cors = require("cors");

// Routes import
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

// Mongo connection
const uri = "mongodb+srv://hulston:17186wxYf@cluster0.2isbxez.mongodb.net/recipe_db?retryWrites=true&w=majority";

const mongoose = require('mongoose');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

// App definitions
app.use(cors());
app.use(express.json());

// Define homepage route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Define routes
app.use('/recipes', recipeRoutes);
app.use('/user', userRoutes);

// App listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});