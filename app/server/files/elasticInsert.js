var elasticsearch = require('elasticsearch');
var fs = require("fs");

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

function Insertion(){
    var json = JSON.parse(fs.readFileSync("./output.json","utf8"));
    var bodyBrand = {
        body:[
        ]
    };
    for(var i = 0; i < json.length; i++){    
        bodyBrand.body.push({ index:  { _index: 'caradisiac', _type: 'voiture', _id: i } });
        bodyBrand.body.push({  doc : json[i]} );
    }
    client.bulk(bodyBrand);
}
//Insertion();

module.exports = { Insertion:Insertion}
