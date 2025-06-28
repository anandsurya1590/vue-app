const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the Vue app server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Serve static files from the Vue app