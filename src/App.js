import React from 'react';
import Home from './component/Home';
import './App.css'
import DataProvider from './component/DataProvider';

const App = () => {
  return (
    <DataProvider>
      <Home/>
    </DataProvider>
  );
};

export default App;
