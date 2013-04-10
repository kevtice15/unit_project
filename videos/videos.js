var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;

var optionsWithEnableWriteAccess = { w: 1 };
var dbName = 'videodb'
 
var BSON = mongo.BSONPure;
 
var db = new mongo.Db(
	dbName,
	new mongo.Server(host, port, {auto_reconnect: true}),
	optionsWithEnableWriteAccess
);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to " + dbName + " database");
        db.collection('videos', {safe:true}, function(err, collection) {
        	//would want to put the creation of the DB structure in here if there is no collection returned
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving video: ' + id);
    db.collection('videos', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('videos', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addVideo = function(req, res) {
    var video = req.body;
    console.log('Adding video: ' + JSON.stringify(video));
    db.collection('videos', function(err, collection) {
        collection.insert(video, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 

/*Will want to implement a function to initally build the database structure...possibly put in a separate module*/
var createDbStructure = function() {
 
};