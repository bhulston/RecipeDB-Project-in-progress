import React from 'react';
import '../App.css';
import HeroSection from '../sections/HeroSection';
import BodyB from '../sections/BodyB';
import Footer from '../components/Footer';

function Home () {
    return (
        <>
        <div>
            <HeroSection />
            <BodyB/>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    )
}

export default Home;