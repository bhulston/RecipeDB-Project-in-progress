import React, {useEffect} from 'react';
import '../App.css';
import HeroSection from '../sections/HeroSection';
import BodyB from '../sections/BodyB';
import Footer from '../components/Footer';

function Home () {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    
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