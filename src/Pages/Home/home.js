// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/NavBar/navbar';
import "../Home/home.scss"
import ToggleImage from '../../Components/ToggleImage/toggleImg';
function Home() {
    return (
        <div className="home_cntr">
            <header>
                < Navbar />
                <h1 className="home">Welcome to coKraft</h1>
                <p className="home1">A collaborative platform for artists to connect</p>
            </header>
            
            <main className='home__cntr4'>
                <ToggleImage />
                <section className="about">
        
                    <div className='home__cntr1'>
                        <h2 className="home">About coKraft</h2>
                        <p className="home1">
                            coKraft is a platform designed to connect artists in the same area, providing a space for collaboration,
                            inspiration, and networking.
                        </p>
                    </div>
                </section>
                <section className="home">
                    <div className='home__cntr2'>
                        <h2 className="homekey">Key Features</h2>
                        <ul>
                            <li>Find and connect with local artists</li>
                            <li>Discover  the work of artist in your area</li>
                        </ul>
                    </div>
                </section>
                <section className="home">
                    <div className='home__cntr3'>
                        <h2 className="home">Get Started</h2>
                        <p className="home1">Explore coKraft today and start collaborating with artists near you.</p>
                    </div>
                        <Link to="/find">
                            <button className="home_btn">Find Artists Now</button>
                        </Link>
                </section>
            </main>

        </div>
    );
}

export default Home;
