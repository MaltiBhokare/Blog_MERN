


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css"; // Import your custom styles

const PostList = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts when the component is mounted
    useEffect(() => {
        axios.get("https://blog-mern-api-eta.vercel.app/api/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div className="post-list-container">
            <h2>All Blog Posts</h2>
            <div className="post-list">
                {posts.length === 0 ? (
                    <p>No blog posts available.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <h3>{post.title}</h3>
                            {/* Ensure the image is loaded properly */}
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="post-image" 
                            />
                            <p>{post.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostList;
