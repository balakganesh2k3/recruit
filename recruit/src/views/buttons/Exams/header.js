import React from 'react';

function Header() {
  return (
    <header>
      <h1>Example Verbal Reasoning Questions</h1>
      <p>Grow Fearless in time for the real thing.</p>
      <div className="user-info">
        <span>Welcome back, <strong>John wick</strong></span>
        <input type="search" placeholder="Search job, location etc" />
      </div>
    </header>
  );
}

export default Header;
