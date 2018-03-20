const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var data = [];

async function Brands () {
    const brands = await getBrands();
    var i = 1;
    brands.forEach(brand => {
        async function Models(){
            const models = await getModels(brand);
            models.forEach(marque =>{
                data.push(marque);
                fs.writeFile("output.json",JSON.stringify(data),'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("Brand: "+ i);
                i++;
            });
        }
        Models();
    });
};
//console.log(Brands());

module.exports = { Brands:Brands}


