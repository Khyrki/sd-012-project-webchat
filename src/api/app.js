const express = require('express');
const cors = require('cors');
const path = require('path');
const { chat } = require('../routes/chatRoutes');

const app = express();

const viewsPath = path.resolve(`${__dirname}../../views`);
const publicPath = path.resolve(`${__dirname}../../../public`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(chat);

module.exports = app;