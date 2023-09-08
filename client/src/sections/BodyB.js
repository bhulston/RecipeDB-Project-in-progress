import React, {useContext, useEffect, useState} from 'react';
import './BodyB.css';
import { Button } from '../components/Button';
import { UserContext } from '../App';

const BodyB = () => {
  
  const { user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [buttonText, setButtonText] = useState('Sign In');
  let [buttonLink, setButtonLink] = useState('/log-in')

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    const wrappers = document.querySelectorAll('.wrapper');

    function animateElements() {
      wrappers.forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          wrapper.classList.add('animation');
        } else {
          wrapper.classList.remove('animation');
        }
      });
    }

    animateElements();
    window.addEventListener('scroll', animateElements);

    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  if (isLoggedIn) {
    buttonLink = '/profile'
    buttonText = 'Profile'
  } else {
    buttonLink = '/log-in'
    buttonText = 'Log in'
  }

  



 
  return (
    <div className="bodyB">
      <div className="wrapper">
        <h1 className="header">Getting Started</h1>
      </div>
        <div className="grid">
        {/* First grid spot */}    
          <div className="wrapper">
            <h4 className="sub-header">Make a profile & save recipes</h4>
                <p className="paragraph">
                    We won't use your email or information for anything other than storing your recipes for later! Sign up easily and access your recipes at any time.
                </p> 
                {Button && <Button linkTo= {buttonLink} buttonStyle='btn--body' buttonSize='btn--medium'>{buttonText}</Button>} 
          </div>
        
        {/* Second grid spot */}  
          <div className="wrapper">
            <h4 className="sub-header">Recipe GPT</h4>
                <p className="paragraph">
                Talk with our chatbot that helps you find the perfect recipe.
                Leveraging open-source Large Language Models, we've trained a LLM on over 100,000+ recipes.
                </p>
                    
                {Button && <Button linkTo='/recipegpt' buttonStyle='btn--body' buttonSize='btn--medium'>Try it out</Button>}
          </div>

        {/* Third grid spot */}  
          <div className="wrapper">
            <h4 className="sub-header">Search for recipes manually</h4>
                <p className="paragraph">
                Use combinations of ingredients and nutritional information to find the perfect recipe for your breakfast/lunch/dinner.
                Using ElasticSearch for optimized queries.
                </p>
                    
                {Button && <Button linkTo='/search' buttonStyle='btn--body' buttonSize='btn--medium'>Search</Button>}
          </div>

        {/* Fourth grid spot */}  
          <div className="wrapper">
            <h4 className="sub-header">Open sourced project</h4>
                <p className="paragraph">
                We've open sourced all our code for the website, LLM, and other models so please take a look and reach out if you have any questions!
                </p>
                    
                {Button && <Button linkTo='/log-in' buttonStyle='btn--body' buttonSize='btn--medium'>Github</Button>}
          </div>  

        </div>      
    </div>
  );
};

export default BodyB;
