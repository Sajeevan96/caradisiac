const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//Routes
const noteRoutes = require('./populate');
noteRoutes(app);



