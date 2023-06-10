const mongoose = require('mongoose');
// const uri = "mongodb+srv://hulston:17186wxYf@cluster0.2isbxez.mongodb.net/recipe_db?retryWrites=true&w=majority";

// Your User schema and model definition go here

// Connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(() => {
//       console.log('Connected to MongoDB...');
//     })
//     .catch((error) => {
//       console.error('Error connecting to MongoDB', error);
//     });


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

module.exports = mongoose.model('User', userSchema, 'users');
