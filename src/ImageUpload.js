import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 13 * 1024 * 1024) {
        setErrorMessage('File size exceeds 13MB. Please choose a smaller file.');
      } else {
        setSelectedFile(file);
        setErrorMessage('');
        // Preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Sending POST request to upload the image
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Setting state with related images received from the server
      setRelatedImages(response.data.relatedImages);
      // Clear selected file and preview after successful upload
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error uploading the file:', error);
      setErrorMessage('Error uploading the file. Please try again.');
    }
  };

  // Function to handle clearing selected file
  const handleClear = () => {
    setSelectedFile(null); // Clear selected file
    setPreviewImage(null); // Clear preview image
    setErrorMessage(''); // Clear error message
    // Do not clear relatedImages
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        {/* File input field */}
        <input type="file" onChange={handleFileChange} style={{ marginRight: '10px' }} />
        {/* Submit button */}
        <button type="submit" disabled={!selectedFile || errorMessage} style={{ marginRight: '10px' }}>
          Upload
        </button>
        {/* Clear button */}
        <button type="button" onClick={handleClear} style={{ marginRight: '10px' }}>
          Clear
        </button>
      </form>
      {/* Error message */}
      {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
      {/* Display selected file name and preview */}
      {selectedFile && (
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <div>
            <strong>Selected file:</strong> {selectedFile.name}
          </div>
          {previewImage && (
            <img src={previewImage} alt="Preview" style={{ marginLeft: '10px', maxWidth: '100px', maxHeight: '100px' }} />
          )}
        </div>
      )}
      {/* Display related images */}
      <div>
        {relatedImages.map((image, index) => (
          <img key={index} src={image} alt="Related" style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
