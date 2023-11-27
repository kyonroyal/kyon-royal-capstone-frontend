// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/NavBar/navbar';
import "../Home/home.scss"

function Home() {
  return (
    <div className="home">
      <header>
        < Navbar/>
        <h1>Welcome to coKraft</h1>
        <p>A collaborative platform for artists to connect</p>
      </header>
      <main>
        <section className="about">
          <h2>About coKraft</h2>
          <p>
            coKraft is a platform designed to connect artists in the same area, providing a space for collaboration,
            inspiration, and networking.
          </p>
        </section>
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Find and connect with local artists</li>
            <li>Collaborate on projects and share ideas</li>
            <li>Discover events and exhibitions in your area</li>
          </ul>
        </section>
        <section className="get-started">
          <h2>Get Started</h2>
          <p>Join coKraft today and start collaborating with artists near you.</p>
          <Link to="/find">
            <button>Sign Up</button>
          </Link>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 coKraft. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
