const express = require('express');
const app = express();
const port = process.env.PORT || 5000;  // If port not set, defaults to 5000
const cors = require("cors");

const mongoose = require('mongoose');
const uri = "mongodb+srv://hulston:17186wxYf@cluster0.2isbxez.mongodb.net/recipe_db?retryWrites=true&w=majority";

app.use(cors());

// Define homepage route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const testRecipe = {
  "recipeName": 'Spaghetti Bolognese',
  "cuisine": 'Italian',
  "ingredients": [
    {"Name": 'Spaghetti Noodles', "Quantity": '250g'},
    {"Name": 'Ground Beef', "Quantity": '300g'},
    {"Name": 'Diced Onion', "Quantity": '1'},
  ],
  "instructions": [
    'Cook spaghetti according to package instructions',
    'In a separate pan, cook ground beef with diced onion',
    'Add cooked noodles and serve',
  ]
};

// 
app.get('/recipes/test/random', (req, res) => {
  try {
    res.json(testRecipe);
  } catch (error) {
    console.log('Example json: Not valid');
    res.status(500).json({error: 'Failed to retrieve random recipe'});
  }  
});

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Define schema for recipe and model
const recipeSchema = new mongoose.Schema({
  recipe_num: { type: Number, required: true },
  recipe_name: { type: String, required: true },
  cuisine: { type: String, required: false },
  ingredients: [
    {
      Name: { type: String, required: true },
      Quantity: { type: String, required: false },
      'Unit of measure': { type: String, required: false },
      Preparation_note: { type: String, required: false },
      Calories: { type: String, required: false },
      'Carbohydrates (g)': { type: String, required: false },
      'Protein (g)': { type: String, required: false },
      'Total fats (g)': { type: String, required: false },
    },
  ],
  total_nutrients: {
    'Protein (g)': { type: String, required: false },
    Calories: { type: String, required: false },
    'Carbohydrates(g)': { type: String, required: false },
    'Total Fat (g)': { type: String, required: false },
  },
  'protein': { type: mongoose.Schema.Types.Decimal128, required: false },
  'calories': { type: mongoose.Schema.Types.Decimal128, required: false },
  'carbohydrates': { type: mongoose.Schema.Types.Decimal128, required: false },
  'fats': { type: mongoose.Schema.Types.Decimal128, required: false },
  instructions: [{ type: String, required: false }],
  cooking_stages: [{ type: String, required: false }],
  ingredeintNames: [{type: String, required: false}],
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'copy_recipes');

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema, 'users');

// so the req should only be used when there is data coming from the front end (like an input or serach from user?)
async function getRandomIndex() {
  try{
    let count = await Recipe.countDocuments().exec();
    console.log('Count:', count);
    const randomIndex = Math.floor(Math.random() * count);
    return randomIndex
  } catch (e) {
    console.error('Error:', e)
  } finally {
    console.log('Done fetching...');
  }
};

app.get("/recipes/random", async (req, res) => {
  try {    
    // Test find
    console.log('Model info:', Recipe.name, Recipe.collection.name);

    // Generate random index
    const idx = await getRandomIndex();
    console.log(idx);
    
    // Select recipe of randomIndex
    const randomRecipe = await Recipe.findOne().skip(idx);
    res.json(randomRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'MongoDB request error', error });
  }
});

// Full text search on MongoDB with Atlas
app.get('/recipes/search', async (req, res) => {
  try {
    // Parse search queries from request
    const searchQuery1 = req.query.searchQuery1 ? req.query.searchQuery1.split(/[;,\.]/).map(str => str) : [];
    const searchQuery2 = req.query.searchQuery2 || '';
    const pRangeMin = parseFloat(req.query.pRangeMin) || 0.0;
    const pRangeMax = parseFloat(req.query.pRangeMax) || 1000.0;
    const cRangeMin = parseFloat(req.query.cRangeMin) || 0.0;
    const cRangeMax = parseFloat(req.query.cRangeMax) || 1000.0;
    const fRangeMin = parseFloat(req.query.fRangeMin) || 0.0;
    const fRangeMax = parseFloat(req.query.fRangeMax) || 1000.0;

    // Initialize array for 'must' conditions
    let must = [];

    // Construct separate text search condition for each ingredient in searchQuery1
    searchQuery1.forEach(ingredient => {
      must.push({
        'text': {
          'query': ingredient,
          'path': 'ingredientNames',
          'fuzzy': {
            'maxEdits': 2,
          }
        }
      });
    });

    // Add text search condition for searchQuery2
    if (searchQuery2.trim() !== '') {
      must.push({
        'text': {
          'query': searchQuery2,
          'path': {wildcard: "*"},
          'fuzzy': {
            'maxEdits': 1,
          }
        }
      });
    }

    // Perform search with constructed 'must' conditions and range filters
    console.log(pRangeMin, must);
    const results = await Recipe.aggregate([
      {
        $search: {
          index: "default",
          'compound': {
            'must': must,
            'filter': [
              {
                'range': {
                  'path': 'protein',
                  'gte': pRangeMin,
                  'lte': pRangeMax
                }
              },
              {
                'range': {
                  'path': 'calories',
                  'gte': cRangeMin,
                  'lte': cRangeMax
                }
              },
              {
                'range': {
                  'path': 'fats',
                  'gte': fRangeMin,
                  'lte': fRangeMax
                }
              }
            ]
          }
        }
      },
      {
        $limit: 10
      }
    ]);

    // Send results to client
    res.send(results);
    console.log('Query results', results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while searching.');
  }
});


// Create a user
app.put("/user/create", express.json(), async(req, res) => {
  const {email, password} = req.body;
  console.log('Attempting to save user')

  try {
    await User.updateOne(
      { email: email},
      { password: password},
      { upsert : true}
    )
    console.log('Successful!')
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'MongoDB request error', error});
  }

  res.send('User created!')
});

// Verify a user for login
app.post('/user/verify', express.json(), async(req, res) => {
  const {email, password} = req.body;
  console.log('Checking password for user', email);
  
  try {
    
    const user = await User.findOne({ email: email });
    console.log('User found:', user);
    
    if (!user) {
      res.json({message: 'User not found', verified:false});
      return ;
    };

    if (user && user.password == password) {
      res.status(200).json({message:'User verified!', verified:true});
    } else {
      res.json({message: 'Invalid email/password!', verified:false});
    };

    console.log('Found user', user.email);
    console.log('Password is', user.password);

  } catch (error) {
    console.log('Error fetchnig user', error);
    res.status(500).json({message: 'Server error', verified:false});
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// most things commented out right now