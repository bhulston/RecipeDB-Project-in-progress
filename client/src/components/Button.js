import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--body', 'btn--search']; 

const SIZES = ['btn--medium', 'btn--large', 'btn--wide'];

export const Button = ({
    children, type, onClick, buttonStyle, buttonSize, linkTo
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    // Please explain the above in English

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={linkTo} className = 'btn-mobile'>
          <button 
            className = {`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick = {onClick}
            type = {type}
          >
            {children}
          </button>
        </Link>
    );
};

// export default Button;