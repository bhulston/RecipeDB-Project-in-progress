import React from 'react';
import '../App.css';
import HeroSection from '../components/HeroSection';
import BodyB from '../components/BodyB';
import Footer from '../components/Footer';

function Home () {
    return (
        <>
            <HeroSection /> 
            <BodyB/>
            <div>
            <Footer/>
            </div>
        </>
    )
}

export default Home;