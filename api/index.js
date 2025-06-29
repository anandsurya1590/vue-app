const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());  
app.use('/api/users', userRoutes);

app.get('/api', async (req, res) => {
  res.send({ message: 'API is working' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Serve static files from the Vue app