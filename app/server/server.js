const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

const port = 9292;

var data = [];

async function Brands () {
    const brands = await getBrands();
    var i = 1;
    brands.forEach(brand => {
        async function Models(){
            const models = await getModels(brand);
            models.forEach(marque =>{
                console.log(marque);
                data.push(marque);
                fs.writeFile("output.json",JSON.stringify(data),'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Brand: "+ i);
                });
            });
            i++;
            
            //console.log(models);
        }
        Models();
    });
};
//console.log(Brands());



var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

client.bulk({
  body: [
    { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
    { title: element  }, //element to add
  ]
});

/*require('./api/routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});*/

