// src/components/Page1.js
import React, { useState, useEffect } from 'react';

const Page3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/page1')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Page 3</h1>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page3;
