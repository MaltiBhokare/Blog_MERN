


import React, { useState } from "react";
import axios from "axios";
import "./AddPost.css"; // Importing the CSS for styling

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(""); // State for displaying image file name
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // State to store error messages

    // Handle the image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Validate the file size and type
        if (file && file.size > 5000000) { // 5MB limit
            alert("File size exceeds 5MB!");
            setImage(null);
            setImageName("");
            return;
        }

        if (file && !file.type.startsWith("image/")) {
            alert("Please select a valid image file!");
            setImage(null);
            setImageName("");
            return;
        }

        setImage(file);
        setImageName(file.name); // Set the file name
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error state on submit

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("description", description);

        try {
            const response = await axios.post("http://localhost:5000/api/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Post added successfully!");
            setTitle("");
            setImage(null);
            setImageName(""); // Clear image name after successful post
            setDescription("");
        } catch (error) {
            console.error("Error adding post:", error);

            if (error.response) {
                setError(error.response.data.message || "Failed to add post.");
            } else {
                setError("Failed to add post. Please try again later.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="add-post-container">
            <h2>Add a New Blog Post</h2>

            {/* Display error message if any */}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="add-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input 
                        type="file" 
                        id="image"
                        onChange={handleImageChange} 
                        required 
                    />
                    {imageName && <p className="file-name">Selected File: {imageName}</p>} {/* Display the file name */}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Write your post description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Posting..." : "Add Post"}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
