require('dotenv').config();
const express = require('express');
const cors = require('cors');
const faltasRoutes = require('./routes/faltasRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/faltas', faltasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});