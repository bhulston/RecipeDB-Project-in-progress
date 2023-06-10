const mongoose = require('mongoose');

// Recipe schema 
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

// Model definition
module.exports = mongoose.model('Recipe', recipeSchema, 'copy_recipes');
