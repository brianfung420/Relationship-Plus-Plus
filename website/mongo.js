const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "GameList";
const dbCollection = "GameList";

module.exports.connect = function connect(callback){
	mongo.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}, function (err, client) {
		if (err) throw err;
		console.log("Connected to Database");
		module.exports.db = client.db(dbName);
		callback(err);
	});
}