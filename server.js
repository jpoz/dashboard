var util = require('util');
var express = require('express');
var db      = require('./db');

var app = express.createServer();

db.open(function(client) {
  
  app.configure(function(){
      app.use(express.logger());
      
      app.use(app.router);
      
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express["static"](__dirname + '/public'));
      
      app.use(express.methodOverride());
  });
  
  
  app.get('/events.json', function(req, res) {
    
    client.events(function(items) {
      res.send(items);
    });
    
  });
  
  app.listen(4000);
  util.log('Running Server');
  
});


