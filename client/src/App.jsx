


import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddPost from './pages/AddPost';  // Import AddPost component
import PostList from './pages/PostList'; // Import PostList component
import './App.css';  // Assuming global styles are applied here

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          {/* Link to PostList Page (Home for Blog) */}
          <Link to="/posts" className="nav-link">
            <h1>My Blog</h1>
          </Link>
        </div>
        <div className="navbar-links">
          {/* Link to AddPost Page */}
          <Link to="/add-post" className="nav-link">
            <button className="btn">Add Blog</button>
          </Link>
          {/* Link to PostList Page */}
          <Link to="/posts" className="nav-link">
            <button className="btn">List Blog</button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="hero">
          <div className="hero-content">
            <h1>Welcome to My Blog</h1>
            <p>Share your thoughts and ideas with the world.</p>
          </div>
        </header>

        {/* Routes for Blog Pages */}
        <Routes>
          {/* Root route displays home page */}
          <Route path="/" element={<HomePage />} /> {/* Home page for general content */}

          {/* Route for Post List Page (List Blog) */}
          <Route path="/posts" element={<PostList />} />

          {/* Route for Add Post Page */}
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </div>
    </div>
  );
};

// Create a separate HomePage component for the root path
const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Home Page of My Blog!</h2>
      <p>Here is some introduction or general content about the blog.</p>
      <p>Click the "List Blog" button in the navbar to see all posts.</p>
    </div>
  );
};

export default App;
