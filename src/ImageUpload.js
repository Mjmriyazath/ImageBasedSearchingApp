// src/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css'
const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRelatedImages(response.data.relatedImages);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="image-upload">
     <div className="App">
    <header className="header">
      <h1>Pixel Search</h1>
      </header>
  </div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div className="related-images">
        {relatedImages.map((image, index) => (
          <img key={index} src={image} alt="Related" />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
