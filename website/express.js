var express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const bodyParser = require('body-parser');

//LIFF
const passport = require('passport');
const session = require('express-session');

const mongodb = require('./mongo.js')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const myLiffId = "1654663712-jX3xwOow";

app.set('view engine','pub');
app.set('views','./views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname)));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
    res.end();
});

//LIFF setting
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//主頁内容
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

//主頁内容
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

//游戲商店内容 + 讀取資料庫來設置游戲庫界面
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

//客制化游戲界面
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

//客制化完成内容
app.post('/customGameUpload',function(req,res){
	console.log("customGame POST!");
	let json_text;
	let form = new formidable.IncomingForm();
	form.uploadDir = './userData/img';
	form.keepExtensions = true;//儲存副檔名
	form.parse(req, function(error, fields, files) {
		if(error){
			throw error;
		}
		//fields為文字，而files則是圖片(目前來看)
     	console.log("parsing done");
     	json_text = fields;
     	console.log("json_text:"+json_text);
     	console.log("Typeof json_text:"+typeof json_text);
     	let idName = Object.keys(files);

     	for(var i=0;i<idName.length;i++){
     		if(files[idName[i]].name!=''){
     			console.log(idName[i]+":"+files[idName[i]].path);
     			json_text[idName[i]] = files[idName[i]].path;
     		}
     	}

	    fs.readFile("./gameShop.html",function(err,data){
			if(err){
				throw err;
			}
			res.writeHead(200,{"Content":"text/html"});
			res.write(data);
			res.end();
		});
  	});

	mongodb.connect(function (err){
		if(err) throw err;
		mongodb.db.collection('GameList').insertOne(json_text,function(err,res){
			if(err) throw err;
			console.log("1 document inserted");
			//db.close()
		});
	});
	
});

app.listen(port,function(){
	console.log("app listening on post 8080!");
});