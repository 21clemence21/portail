let mongoose = require('mongoose');
const express = require('express'); 


const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'portfolio';      // REPLACE WITH YOUR DB NAME
var bodyParser = require("body-parser"); 

var app  = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser: true }  )
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = Database;

