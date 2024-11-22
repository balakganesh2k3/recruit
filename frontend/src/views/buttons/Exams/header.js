import React from 'react';

function Header({ username = "John Wick" }) {
  return (
    <header>
      <h1>Example Verbal Reasoning Questions</h1>
      <p>Grow Fearless in time for the real thing.</p>
      <div className="user-info">
        <span>Welcome back, <strong>{username}</strong></span>
      </div>
    </header>
  );
}

export default Header;

