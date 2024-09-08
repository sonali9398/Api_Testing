import React, { useState }  from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'


const Home = () =>{
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  
    return(
        <div className="app-container">
        <nav className="sidebar">
          <ul >
            <li className='boxes'><Link to="/page1">Test API</Link></li>
            <li className='boxes'><Link to="/page2">JSON Formatter</Link></li>
            <li className='boxes'><Link to="/page3">Test Page</Link></li>
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
          </Routes>
        </div>
      </div>
    
    )
}

export default Home