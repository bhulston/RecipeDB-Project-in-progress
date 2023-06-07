import React, { useEffect } from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from '../components/Button';

function HeroSection() {
  useEffect(() => {
    const container = document.querySelector('.hero-container');
    container.classList.add('appear');
    window.scrollTo(0, 0);
  }, []);
  
  return (
   <> 
    <video src='/media/video_1.mp4' autoPlay loop muted />
    <div className='hero-container'>
      
      <h1>Find Recipes From Around The World</h1>
      <p>
        Search by your own criteria, or use our own chatbot to find your perfect, healthy recipe today!
      </p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          linkTo='/search'
        >
          RECIPE SEARCH <i class="fa-solid fa-magnifying-glass"></i>
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          linkTo='/recipegpt'
          onClick={console.log('hey')}
        >
          RECIPE GPT <i className='fa-solid fa-robot' />
        </Button>
      </div>
    </div>
    </>
  );
}

export default HeroSection;

