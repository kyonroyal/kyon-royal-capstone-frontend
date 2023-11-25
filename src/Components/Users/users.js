// User.js
import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Art Style: {user.artStyle}</p>
      <p>Zip Code: {user.zipCode}</p>
      <img src={user.profileImage} alt={`${user.name}'s Profile`} style={{ maxWidth: '200px' }} />
      <h3>Portfolio:</h3>
      <ul>
        {user.portfolio.map((item, index) => (
          <li key={index}>
            <img src={item.url} alt={`Portfolio Image ${index + 1}`} />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default User;
