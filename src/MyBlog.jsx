import React, { useState } from 'react';
import './App.css'; // Import your Tailwind CSS styles

const MyBlog = () => {
  const [showBlogButtons, setShowBlogButtons] = useState(false);

  const handleBlogClick = () => {
    setShowBlogButtons(!showBlogButtons);
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center bg-gray-100 p-4">
        <div className="w-24 h-12 bg-gray-300 flex justify-center items-center">
          <img src="your-logo-url-here" alt="Site Logo" className="w-full h-full object-cover" />
        </div>
        <nav className="flex space-x-4">
          <button className="text-blue-500">Home</button>
          <button onClick={handleBlogClick} className="text-blue-500">Blog</button>
          <button className="text-blue-500">Contact</button>
          <button className="text-blue-500">Search</button>
          <button className="text-blue-500">About Us</button>
        </nav>
      </header>
      {showBlogButtons && (
        <div className="flex space-x-4 mt-4">
          <button className="text-blue-500">Blog List Page</button>
          <button className="text-blue-500">Blog Post Page</button>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
