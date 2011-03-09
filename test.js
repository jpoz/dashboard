var util    = require('util');
var db      = require('./db');


db.open(function(client) {
  
  // client.create_event({james: 'awesome'});
  
  client.events(function(items) {
    util.log(util.inspect(items));
    
    client.close();
  });
  
});