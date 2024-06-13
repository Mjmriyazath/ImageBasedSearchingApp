import React from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import GoogleSearch from './GoogleSearch';
import Tinyeye from './Tinyeye'; 
import Yandex from './Yandex';
import Bing from './Bing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="title">Pixel Search</h1>
        
        </div>
        <ImageUpload />
        <br/>
        <div className="search-container">
          <GoogleSearch /> 
          <Tinyeye /> 
          <Yandex />
          <Bing />
        </div>
      </header>
    </div>
  );
}

export default App;
