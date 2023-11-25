
import React from 'react';

const portfolio = ({ user }) => {
  return (
    <div>
      <h2>{user.name}'s Portfolio</h2>
      <ul>
        {user.portfolio.map((item, index) => (
          <li key={index}>
            <img src={item.url} alt={`Portfolio Image ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
