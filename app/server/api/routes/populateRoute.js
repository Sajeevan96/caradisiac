const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.route('/api/populate')
        .post();
};