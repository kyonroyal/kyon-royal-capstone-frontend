
import React from 'react';

const portfolio = ({ user }) => {
  return (
    <div>
      <h2>{user.name}'s Portfolio</h2>
      <ul>
                {portfolio.map((item, index) => (
                  <li key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Portfolio Image {index + 1}
                    </a>
                  </li>
                ))}
              </ul> 
    </div>
  );
};

export default portfolio;
