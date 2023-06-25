import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import './Button.css';
import { Button } from './Button.js';

// User information
import { UserContext } from '../App';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);  

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { user } = useContext(UserContext);

  const showButton = () => {
    if(window.innerWidth <= 960) {
        setButton(false);
    } else {
        setButton(true);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.navbar-container');
    container.classList.add('appear');
  }, []);
    

  window.addEventListener('resize', showButton);

  if (user) {
    return (
        <>
        {/* What is a fragment (as above) and what does it do exactly */}
        {/* Can you explain how the different divs work (nav, a, etc) Is there any real difference between them?? */}
            <nav className = 'navbar'>
                <div className = 'navbar-container'>
                    <Link to="/" className="navbar-logo">
                        {/* What exactly is Link doing here? */}
                        RecipeGPT <i class="fa-solid fa-utensils"></i>
                    </Link>
                    <div className = 'menu-icon' onClick={handleClick}> 
                        <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                        {/* Explain this line of code above. fas is just icon id*/}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick = {closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recipegpt' className='nav-links' onClick = {closeMobileMenu}>
                                RecipeGPT
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/search' className='nav-links' onClick = {closeMobileMenu}>
                                Search
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links-mobile' onClick = {closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                    </ul>
                    {/* Some issue with this line of code causing client to cras    h */}
                    {button && <Button linkTo='/profile' buttonStyle='btn--outline'>Profile</Button>} 
                </div>
            </nav>
    
        </>
      )
  } else {

  return (
    <>
    {/* What is a fragment (as above) and what does it do exactly */}
    {/* Can you explain how the different divs work (nav, a, etc) Is there any real difference between them?? */}
        <nav className = 'navbar'>
            <div className = 'navbar-container'>
                <Link href="/" className="navbar-logo">
                    {/* What exactly is Link doing here? */}
                    HealthyRecipes <i class="fa-solid fa-utensils"></i>
                </Link>
                <div className = 'menu-icon' onClick={handleClick}> 
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                    {/* Explain this line of code above. fas is just icon id*/}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/recipegpt' className='nav-links' onClick = {closeMobileMenu}>
                            RecipeGPT
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/search' className='nav-links' onClick = {closeMobileMenu}>
                            Search
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/log-in' className='nav-links-mobile' onClick = {closeMobileMenu}>
                            Log In
                        </Link>
                    </li>
                </ul>
                {/* Some issue with this line of code causing client to cras    h */}
                {button && <Button linkTo='/log-in' buttonStyle='btn--outline'>Log In</Button>} 
            </div>
        </nav>

    </>
  )
  }
  //* Does class vs className make a difference?
}

export default Navbar;