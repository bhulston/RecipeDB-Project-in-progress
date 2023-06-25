import React, {useEffect} from 'react';
import '../App.css';
import Login from '../sections/Login';


function Log_in () {
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <>
            <Login/> 
        </>
    )
}

export default Log_in;