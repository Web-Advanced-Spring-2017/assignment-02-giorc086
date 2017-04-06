const express = require('express'); //always leave express at the top
const request = require('request');
const app = express();
const port = 3000;
const parser = require('json-parser');
const mongoose = require('mongoose');
const Resort = require('./models/resort');

mongoose.connect('mongodb://localhost/on-the-snow-2'); //connects to db on-the-snow-2 //db 3 and 4 has been used 

let db = mongoose.connection;
var token = '?token=a5bae8eea465aae8f096ad0b775121a6702a31e6eb2686d8';
let handler;
db.once('open', function() {
    console.log('Connection to DB made!'); //tests if connection has been made to db

    Resort.find({}, function(err, documents) {
        for (let resort of documents) {
        	//////////////////////////request for profile - this updates snowreport on db
            request('http://clientservice.onthesnow.com/externalservice/resort/' + resort.id + '/profile' + token + '&language=en&country=US', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var object = parser.parse(body);
                    Resort.update({ id: resort.id }, { resortTerrain: object }, function(err) {
                        if (err) {
                            console.log('Error: ' + err);
                        }
                        console.log('updated at ' + Date.now());
                    });
                }
            });

            //////////////////////////request for snow report - this updates snowreport on db
            request('http://clientservice.onthesnow.com/externalservice/resort/' + resort.id + '/snowreport' + token + '&language=en&country=US', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var object = parser.parse(body);
                    Resort.update({ id: resort.id }, {resortSnowreport: object}, function(err) {
                        if (err) {
                            console.log('Error: ' + err);
                        }
                        console.log('updated at ' + Date.now());
                    });
                }
            });
        }
    });
    //the above will run everything so make sure you don't have too much data above 
    //DONT NEED TIME OUT unless im leabing the server running for days.. 

    // handler = setInterval(() => {
    // },1 * 60 * 60 * 1000); //makes request once a day

});
db.on('error', function(err) {
    console.log(err);
    clearInterval(handler);
});
