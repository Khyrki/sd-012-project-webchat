// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.listen(PORT || 3000, () => console.log(`Listening on port ${PORT}`));

app.use(express.json());