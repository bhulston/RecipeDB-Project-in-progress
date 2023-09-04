import React, {useState, useEffect} from 'react';
import '../App.css';
import SearchRecipe from '../sections/SearchRecipe';
import RecipeDisplay from '../sections/RecipeDisplay';
import Footer from '../components/Footer';



function Search () {
    const [recipes, setRecipes] = useState([]); //initialize as empty array

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    


    return (
        <>
            <SearchRecipe setRecipes={setRecipes}/> 
            <RecipeDisplay recipes = {recipes}/>
            <Footer/>
        </>
    )
}

export default Search;