const path = require('path');
const express = require('express');

const root = require('../routes/root');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/public');

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use('/', root);

module.exports = app;
