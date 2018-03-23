const express = require('express');
const bodyParser = require('body-parser');
const jsonInsert = require("../files/jsonInsert");
const elasticInsert = require("../files/elasticInsert"); 
const connection = require("../files/connection");

const router = express.Router();

router.get('/populate',(req,res) => {
    jsonInsert.Brands().then(elasticInsert.Insertion()).then( function() { res.send(200,"ok")});
});

router.get('/cars',(req,res) =>{
    const searchParams = {
        'index': 'caradisiac',
        'body': {
            'size': 10,
            'query': {
                'match_all': {}
            },
            'sort': [
                {
                    'doc.volume.keyword': {
                        'order': 'desc'
                    }
                }
            ]
        }
    };
    connection.search(searchParams)
        .then((resp) => {
            res.send(resp.hits.hits)
        })
        .catch((err) => {
            res.send(err)
        });
})

module.exports = router;