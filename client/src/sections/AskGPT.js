// Signup.js
import React, {useState} from 'react';
import './SearchRecipe.css';
import { Button } from '../components/Button';
import axios from 'axios';

const SearchRecipe = ({setRecipes}) => {

    // Search componenets
    const [pIsOpen, setPIsOpen] = useState(false);
    const [cIsOpen, setCIsOpen] = useState(false);
    const [fIsOpen, setFIsOpen] = useState(false);

    // string search queries
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    // protein ranges
    const [pRangeMin, setPRangeMin] = useState(0);
    const [pRangeMax, setPRangeMax] = useState(999);
    // cal ranges
    const [cRangeMin, setCRangeMin] = useState(0);
    const [cRangeMax, setCRangeMax] = useState(999);
    // fat ranges
    const [fRangeMin, setFRangeMin] = useState(0);
    const [fRangeMax, setFRangeMax] = useState(999);
    
    const params = {
        "searchQuery1": searchQuery1,
        "searchQuery2": searchQuery2,
        "pRangeMin": pRangeMin,
        "pRangeMax": pRangeMax,
        "cRangeMin": cRangeMin,
        "cRangeMax": cRangeMax,
        "fRangeMin": fRangeMin,
        "fRangeMax": fRangeMax
    };
    
    const searchSubmit = async (event) => {
        event.preventDefault(); //stop default action

        try {
            const response = await axios.get('http://localhost:5000/recipes/search', {params});
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
                <h2 className="search-title">Model still in dev... try out the regular search below for now!</h2>
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