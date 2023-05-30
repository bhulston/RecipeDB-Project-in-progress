const mongoose = require('mongoose');
const uri = "mongodb+srv://hulston:17186wxYf@cluster0.2isbxez.mongodb.net/recipe_db?retryWrites=true&w=majority";

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
  'protein': { type: mongoose.Schema.Types.Number, required: false },
  'calories': { type: mongoose.Schema.Types.Number, required: false },
  'carbohydrates': { type: mongoose.Schema.Types.Number, required: false },
  'fats': { type: mongoose.Schema.Types.Number, required: false },
  instructions: [{ type: String, required: false }],
  cooking_stages: [{ type: String, required: false }],
  ingredientNames: [{ type: String, required: false }],
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'copy_recipes');

async function updateRecipes() {
  // const recipes = await Recipe.find({});

  // for (let recipe of recipes) {
  //   try {
  //     // Convert total_nutrients to Decimal128
  //     for (const nutrient in recipe.total_nutrients) {
  //       if (recipe.total_nutrients.hasOwnProperty(nutrient)) {
  //         if (typeof recipe.total_nutrients[nutrient] === 'string') {
  //           recipe.total_nutrients[nutrient] = mongoose.Types.Decimal128.fromString(recipe.total_nutrients[nutrient]);
  //         } else {
  //           console.error(`Nutrient value for ${nutrient} in recipe ${recipe._id} is not a string: ${recipe.total_nutrients[nutrient]}`);
  //           // Handle non-string values as you see fit
  //         }
  //       }
  //     }
  //     // Mark total_nutrients as modified
  //     recipe.markModified('total_nutrients');

  //     // Extract ingredient names
  //     recipe.ingredientNames = recipe.ingredients.map((ingredient) => ingredient.Name);

  //     // Mark ingredientNames as modified
  //     recipe.markModified('ingredientNames');

  //     // Save the updated recipe
  //     await recipe.save();
  //     console.log(`Updated recipe ${recipe._id}`);
  //   }catch (err) {
  //     console.error(err);
  //     try {
  //       await Recipe.deleteOne({ _id: recipe._id });
  //       console.log(`Deleted recipe ${recipe._id}`);
  //     } catch (deleteErr) {
  //       console.error(`Error deleting recipe ${recipe._id}: ${deleteErr}`);
  //     }
  //   }
  // }  
  const recipes = await Recipe.find({}); 

  for (let recipe of recipes) {
    try {
    recipe.protein = recipe.protein; 
    recipe.calories = recipe.calories;
    recipe.carbohydrates = recipe.carbohydrates;
    recipe.fats = recipe.fats;
    
    recipe.markModified('protein');
    recipe.markModified('calories');
    recipe.markModified('carbohydrates');
    recipe.markModified('fats');
    console.log(`Updating recipe ${recipe._id}`);
    } catch (error) {
      console.error(error)
    }

    try{
      await recipe.save(); 
      console.log(`Recipe Updated ${recipe._id}`);
    } catch(error) {
      console.error(error);
    }
  }
};

updateRecipes();
