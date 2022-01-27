const path = require('path');
const express = require('express');

const { getAll } = require('../controllers/message');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', getAll);

module.exports = app;
