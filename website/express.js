var express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const myLiffId = "1654663712-jX3xwOow";

app.set('view engine','pub');
app.set('views','./views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data

app.use(express.static(path.join(__dirname)));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
    res.end();
});

app.get('/',function(req,res){
	console.log("Get /");
	console.log("path:"+__dirname);
	fs.readFile('./index.html',function(err,data){
		if(err){
			throw err;
		}
		res.writeHead(200,{"Content":"text/html"});
		res.write(data);
		res.end();
	});
});

app.get('/index',function(req,res){
	console.log("Get /index");
	fs.readFile('./index.html',function(err,data){
		if(err){
			throw err;
		}
		res.writeHead(200,{"Content":"text/html"});
		res.write(data);
		res.end();
	});
});

app.get('/gameShop',function(req,res){
	console.log("Get /gameShop");
	fs.readFile("./gameShop.html",function(err,data){
		if(err){
			throw err;
		}
		res.writeHead(200,{"Content":"text/html"});
		res.write(data);
		res.end();
	});
});

app.get('/customGame',function(req,res){
	console.log("customGame Get!");
	fs.readFile("./customGame.html",function(err,data){
		if(err){
			throw err;
		}
		res.writeHead(200,{"Content":"text/html"});
		res.write(data);
		res.end();
	});
});

app.post('/customGameUpload',function(req,res){
	console.log("customGame POST!");
	let form = new formidable.IncomingForm();
	form.uploadDir = __dirname + '\\userData';
	form.keepExtensions = true;//儲存副檔名
	form.parse(req, function(error, fields, files) {
		//fields為文字，而files則是圖片(目前來看)
     	console.log("parsing done");
     	console.log(fields);
     	console.log(files);
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.write("received image");
     	res.end();
  	});
	
});

app.listen(port,function(){
	console.log("app listening on post 8080!");
});