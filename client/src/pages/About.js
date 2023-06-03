import React, {useState} from 'react';
import '../App.css';

import RecipeDisplay from '../sections/RecipeDisplay';
import Footer from '../components/Footer';
import ChatSection from '../sections/ChatSection'

function About () {
    const [recipes, setRecipes] = useState([]); //initialize as empty array

    return (
        <>
            <ChatSection setRecipes={setRecipes}/>
            <RecipeDisplay recipes = {recipes}/>
            <Footer/>
        </>
    )
}

export default About;