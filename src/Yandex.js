// src/components/GoogleButton.js
import React from 'react';
import axios from 'axios';
import Yandex from './yandex.png'; // make sure you have the Google logo image in the specified path

const GoogleButton = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/run-script');
      console.log(response.data);
    } catch (error) {
      console.error('Error running the script:', error);
    }
  };

  return (
    <button onClick={handleClick} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#fff' }}>
      <img src={Yandex} alt="Google Logo" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
      View Result from Yandex
    </button>
  );
};

export default GoogleButton;
