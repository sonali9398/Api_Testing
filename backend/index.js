const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins (or specify your frontend URL)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Add headers if needed
}));
app.use(bodyParser.json()); // To parse JSON bodies
app.options('*', cors()); // Preflight requests handling


// app.post('/api/proxy', async (req, res) => {
//   const { method, url, body } = req.body;

//   try {
//     const response = await axios({
//       method,
//       url,
//       data: body || {}, // Include body if it's a POST/PUT request
//       headers: { 'Content-Type': 'application/json' },
//     });

//     res.json({
//       status: response.status,
//       data: response.data,
//       headers: response.headers,
//       responseTime: response.request.res.responseTime,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching data', details: error.message });
//   }
// });

app.post('/api/proxy', async (req, res) => {
  const { method, url, body } = req.body;

  try {
    const response = await axios({
      method,
      url,
      data: body || {}, // Pass the request body
      headers: { 'Content-Type': 'application/json' }, // Forward headers
      timeout: 5000, // Optional timeout to avoid waiting indefinitely
    });

    res.json({
      status: response.status,
      data: response.data,
      headers: response.headers,
      responseTime: Date.now() - req.startTime, // Calculate response time
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
