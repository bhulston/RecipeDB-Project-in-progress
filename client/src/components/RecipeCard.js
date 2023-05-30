import React, { useState, useEffect } from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const handleTitleClick = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    return (
        <div className="recipe-card" onClick={handleTitleClick}>
            <h3 className="card-title" >
                {recipe.recipe_name}    <i className="fa-solid fa-caret-down"></i>
            </h3> 
            {isInfoVisible && (
                <div className="recipe-info">
                    <h4>Cuisine: </h4><ul><li>{recipe.cuisine}</li></ul>
                        
                    <h4>Ingredients:</h4>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.Name}</li>
                            ))}
                        </ul>
                    <h4>Nutrients:</h4>
                        <ul>
                            <li>Protein(g): {recipe.protein}</li>
                            <li>Fats(g): {recipe.fats}</li>
                            <li>Calories: {recipe.calories}</li>
                            <li>Carbohydrates: {recipe.carbohydrates}</li>
                        </ul>
                       
                </div>
            )}
        </div>
    )
};

export default RecipeCard;
