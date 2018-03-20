const express = require('express');
const bodyParser = require('body-parser');
const jsonInsert = require("../files/jsonInsert");
const elasticInsert = require("../files/elasticInsert"); 
const connection = require("../files/connection");

const router = express.Router();

router.get('/populate',(req,res) => {
    jsonInsert.Brands()
        .then(elasticInsert.Insertion())
});

/*router.get('/suv',(req,res) =>{
    client.search()
})*/

module.exports = router;