// Navbar.js
import React from 'react';
import logoImage from '../../assets/cokraft.png';
import uploadIcon from '../../assets/upload.svg';
import searchIcon from '../../assets/search.svg';
import { NavLink } from 'react-router-dom';
import '../NavBar/navbar.scss'


function Navbar() {
    return (
        <nav className="nav">
            <div className="nav__cntnt">
                <NavLink to="/">
                    <img className="nav__logo" src={logoImage} alt="Logo" href="#" />
                </NavLink>
                <div className="nav__sub-cntnt">
                    <label className="nav__search-label">
                        <img className='nav__search-input-icon' src={searchIcon} alt="Search Icon" />
                        <input className="nav__search-input" placeholder="Search" />
                    </label>
                    
                    <NavLink className="nav__nav-link" to="/gallery">Gallery</NavLink>
                    <NavLink className="nav__nav-link" to="/find">Find Artist</NavLink>
                    <NavLink className="nav__nav-link" to="/upload">Upload</NavLink>
                    
                </div>
                <NavLink className="nav__upld-btn-link" to="/upload">
                    <button className="nav__upld-btn">
                        <img className='nav__upld-btn-icon' src={uploadIcon} alt="Upload Icon" />Upload
                    </button>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;
