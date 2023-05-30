import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeDisplay.css';

// Define our functional component
const RecipeDisplay = ({recipes}) => {
    // State variable value set to null. Define update function.
    if (recipes.length > 0) {      
        return ( // Visual/UI component
            <div className="recipesContainer">
                <h2 className="containerTitle">Recipe Results</h2>
                 {recipes.map(recipe => (
                    <RecipeCard key = {recipe._id} recipe = {recipe}/>
                ))}
            </div>
        )
    } else {
        return (
            <div className="recipesContainer-empty">
                <h2 className="containerTitle">No recipes found...</h2>
            </div>
        )
    }
};

// Exports component to be used elsewhere
export default RecipeDisplay;