var util    = require('util');
var mongo   = require('mongodb');

var client = new mongo.Db('dashy', new mongo.Server("127.0.0.1", 27017, {}));

var DashDatabase = function(client) {
  this.client = client;
};

DashDatabase.prototype.events = function(callback) {
  this.client.collection('events', function(err, collection) {
    
    collection.find(function(err, cursor) {
      
      cursor.toArray(function(err, items) {
        callback(items);
      });
      
    });
    
  });
};

DashDatabase.prototype.create_event = function(obj, callback) {
  this.client.collection('events', function(err, collection) {
    collection.insert(obj, function(err, result) {
      if (callback) callback();
    });
  });
};

DashDatabase.prototype.close = function() {
  this.client.close();
};

exports.open = function(callback) {
  client.open(function(err, p_client) {
    if (err) {
      util.log("ERROR (DO YOU HAVE MONGO RUNNING????): " + err);
    } else {
      util.log("Connected to mongoDB: " + p_client.databaseName);
      callback(new DashDatabase(p_client));
    }
  });
};