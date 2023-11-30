// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/NavBar/navbar';
import "../Home/home.scss"
import ToggleImage from '../../Components/ToggleImage/toggleImg';
import SubHero from '../../Components/Subhero/subhero';
function Home() {
    return (
        <div className="home_cntr">
            <header>
                < Navbar />
                <h1 className="home">Welcome to coKraft</h1>
                <p className="home1">A collaborative platform for artists to connect and post their latest creations</p>
            </header>

            <main className='home__cntr4'>
                {/* <ToggleImage /> */}
                <div className='home__cntr1'>
                    <h2 className="home">Recent Collaborations</h2>
                    <SubHero />

                </div>
                <section className="about">

                    <div className='home__cntr1'>
                        <h2 className="home">About coKraft</h2>
                        <p className="home1">
                            coKraft is a platform designed to connect artists in the same area, providing a space for collaboration,
                            inspiration, and networking. coKraft is meant to fill the void for artists looking to combine their ideas with like-minded creatives and build community.
                        </p>
                    </div>
                </section>
                <section className="home">
                    <div className='home__cntr2'>
                        <h2 className="homekey">Key Features</h2>
                        <ul>
                            <li>Post the artwork you create with Artists</li>
                            <li>Discover the work of artist in your area</li>
                        </ul>
                    </div>
                </section>
                <section className="home">
                    <div className='home__cntr3'>
                        <h2 className="home">Next Steps</h2>
                        <p className="home1">User Authentication and the ability to sign into your own gallery</p>
                        <p className="home1">Ability to Display on Map the closest artist in your area</p>
                        <p className="home1">Realtime Chat feature that will give the Artist the ability to reach out to another artist and collaborate</p>
                    </div>
                    <Link to="/upload">
                        <button className="home_btn">Post an Artwork</button>
                    </Link>
                </section>
            </main>

        </div>
    );
}

export default Home;
