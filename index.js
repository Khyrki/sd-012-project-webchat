const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Muito Que Bem'));
app.listen(port, () => console.log(`Escutando na porta ${port}!`));