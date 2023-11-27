// Navbar.js
import React from 'react';
import logoImage from '../../assets/cokraft.png';
import uploadIcon from '../../assets/upload.svg';
import searchIcon from '../../assets/search.svg';
import galleryIcon from '../../assets/gallery-bold.svg'
import post from '../../assets/gallery-add-broken.svg'
import find from '../../assets/find-one.svg'
import { NavLink } from 'react-router-dom';
import '../NavBar/navbar.scss'
import motion from 'framer-motion'


function Navbar() {
    return (
        <nav className="nav">
            
            <div className="nav__cntnt">
                <NavLink to="/home">
                    <img className="nav__logo" src={logoImage} alt="Logo" href="#" />
                </NavLink>
                <div className="nav__sub-cntnt">
                   
             
                    <NavLink to="/gallery">
                    <img className="galleryicon" src={galleryIcon} alt="gallery" href="#" />
                </NavLink>
                <NavLink to="/find">
                    <img className="findartist" src={find} alt="findartist" href="#" />
                </NavLink>
                <NavLink to="/upload">
                    <img className="upload" src={post} alt="upload" href="#" />
                </NavLink>
                    
                </div>
                {/* <NavLink className="nav__upld-btn-link" to="/upload">
                    <button className="nav__upld-btn">
                        <img className='nav__upld-btn-icon' src={uploadIcon} alt="Upload Icon" />Upload
                    </button>
                </NavLink> */}
            </div>
        </nav>
    )
}

export default Navbar;
