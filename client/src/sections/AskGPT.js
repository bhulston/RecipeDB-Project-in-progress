// Signup.js
import React, {useState} from 'react';
import './SearchRecipe.css';
import { Button } from '../components/Button';
import axios from 'axios';

const SearchRecipe = ({setRecipes}) => {

    // string search queries
    const [textQuery1, setTextQuery1] = useState('');
    const [textQuery2, setTextQuery2] = useState('');
    
    const request = {
        "params": {
            "recipes_csv": "",
            "text": textQuery1,
            "text_1": textQuery2 },
        "project": "a4a508823d9d-42e9-ac76-ad1c2889de82"
    };


    const GPTSubmit = async (event) => {
        event.preventDefault(); //stop default action
        const relevanceApi = 'https://api-bcbe5a.stack.tryrelevance.com/latest/studios/91c6c3d9-eaeb-4c7b-aeb8-ec2c8c2d2231/trigger_limited';

        try {
            const response = await axios.post(relevanceApi, {params});
            setRecipes(response.data);
            if (response) {
                console.log('Response Received');
            }
            // return (response)
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="search-container">
          {/* <img src = '/media/img_2.jpg'/> */}
            <div className="search-form">
                <h2 className="search-title">Search for Your Next Meal</h2>
                <h3 className='input-title'>2. Add existing ingredients
                    <div className="search-input-field">
                        <input type="text" className = 'input-box' placeholder="black bean; cilantro" 
                        value = {searchQuery1} onChange = {e => setSearchQuery1(e.target.value)}/>
                    </div>
                </h3>
                <h3 className="input-title">1. What dish are you looking for?
                    <div className="search-input-field">
                        <input className = 'input-box' type="text" placeholder="Spicy Meatballs" 
                        value = {searchQuery2} onChange = {e => setSearchQuery2(e.target.value)}/>
                    </div>
                </h3>   
                <h3 className = "search-button">
                    <Button 
                        buttonStyle='btn--search'
                        buttonSize='btn--medium' 
                        onClick={searchSubmit}>
                        Search
                    </Button>
                    
                </h3>
                <h4>
                    
                    {/* Button w/ dropdown number 1 */}
                    <div className="search-dropdown-input-field">
                        <Button 
                            buttonStyle='btn--body'
                            buttonSize='btn--medium' 
                            onClick={() => setPIsOpen(!pIsOpen)}>
                            {pIsOpen ? "Protein(g)" : "Protein(g)"} <i class="fa-solid fa-caret-down"></i>
                        </Button>
                        {pIsOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <label>
                                    Minimum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={pRangeMin}
                                        onChange={(e) => setPRangeMin(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Maximum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={pRangeMax}
                                        onChange={(e) => setPRangeMax(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="search-dropdown-input-field">
                        {/* Button w/ dropdown number 2 */}
                        <Button 
                            buttonStyle='btn--body'
                            buttonSize='btn--medium' 
                            onClick={() => setCIsOpen(!cIsOpen)}>
                            {cIsOpen ? "Calories" : "Calories"} <i class="fa-solid fa-caret-down"></i>
                        </Button>
                          {cIsOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <label>
                                    Minimum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={cRangeMin}
                                        onChange={(e) => setCRangeMin(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Maximum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={cRangeMax}
                                        onChange={(e) => setCRangeMax(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="search-dropdown-input-field">
                        {/* Button w/ dropdown number 3 */}
                        <Button 
                            buttonStyle='btn--body'
                            buttonSize='btn--medium' 
                            onClick={() => setFIsOpen(!fIsOpen)}>
                            {fIsOpen ? "Fats(g)" : "Fats(g)"} <i class="fa-solid fa-caret-down"></i>
                        </Button>
                          {fIsOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <label>
                                    Minimum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={fRangeMin}
                                        onChange={(e) => setFRangeMin(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Maximum:
                                    <input
                                        className = 'input-box'
                                        type="number"
                                        value={fRangeMax}
                                        onChange={(e) => setFRangeMax(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                </h4>    
            </div>
        </div>
    );
};

export default SearchRecipe;
