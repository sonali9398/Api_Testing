import React, { useState } from 'react';
import SelectTab from './SelectTab';

const Page1 = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [time, setTime] = useState(null);
  const [size, setSize] = useState(null);
  const [view, setView] = useState('pretty'); 

  const handleSendRequest = () => {

    const startTime = Date.now(); 

    fetch(url, { method })
      .then((res) => {
        setStatus(res.status); 
        setSize(res.headers.get('Content-Length'));

         // Check content type
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json(); // Parse as JSON if content type is JSON
        } else {
          return res.text(); // Otherwise, parse as plain text
        }
      })
      .then((data) => {
        setResponse(data);
        setTime(Date.now() - startTime); 
      })
      .catch((error) => console.error('Error:', error));
  };


  return (
    
    <div>
      <h1>Test API</h1>
      <div className='search'>
        <div className='dropdown'>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className='input'>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Enter URL / API here'
          />
        </div>

        <div className='button'>
          <button onClick={handleSendRequest}>Send</button>
        </div>
      </div>

      <SelectTab/>

      {status && (
        <div className='response-info'>
          <p>Status: {status}</p>
          <p>Response Time: {time} ms</p>
          <p>Response Size: {size} bytes</p>
        </div>
      )}
      
      
      {/* Response View Options */}
      <div className='view-options'>
        <button onClick={() => setView('pretty')}>Pretty</button>
        <button onClick={() => setView('raw')}>Raw</button>
        <button onClick={() => setView('preview')}>Preview</button>
        <button onClick={() => setView('JSON')}>JSON</button>
      </div>
      <div>
        {response && (
          <div className='response-body'>
          {view === 'pretty' && (
            typeof response === 'object' ? 
              <pre>{JSON.stringify(response, null, 2)}</pre> : 
              <pre>{response}</pre>
          )}
          {view === 'raw' && <pre>{typeof response === 'object' ? JSON.stringify(response) : response}</pre>}
          {/* {view === 'preview' && <pre>{typeof response === 'object' ? JSON.stringify(response) : response}</pre>} */}
          {view === 'preview' && (
            <div>
              {typeof response === 'object' ? (
                // If it's JSON, display formatted JSON
                <pre>{JSON.stringify(response, null, 2)}</pre>
              ) : (
                // If it's an HTML response, render it as HTML content
                <div dangerouslySetInnerHTML={{ __html: response }} />
              )}
            </div>
          )}
          {view === 'JSON' && (
            <div>
              {typeof response === 'object' ? (
                <pre>{JSON.stringify(response, null, 2)}</pre> // Pretty-print the JSON
              ) : (
                <p>Response is not in JSON format</p> // Handle non-JSON responses
              )}
            </div>
          )}

        </div>
        )}
      </div>
      
    </div>
  );
};

export default Page1;
