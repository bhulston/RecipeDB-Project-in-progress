const Recipe = require('../models/Recipe');

exports.homepage = async (req, res) => {
    return
}

exports.getRandomRecipe = async (req, res) => {
  try {    
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
};

exports.searchRecipes = async (req, res) => {
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
};

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
