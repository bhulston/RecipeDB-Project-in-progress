import React, {useEffect} from 'react';
import '../App.css';
import Signup from '../sections/Signup';


function Sign_up () {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    
    return (
        <>
            <Signup/> 
        </>
    )
}

export default Sign_up;