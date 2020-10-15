var express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//const formidable = require('express-formidable')
//app.use(formidable()); 

const multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './userData/img');
	},
	filename: function (req, file, cb) {
		cb(null,  file.originalname.split('.')[0] + '-' + Date.now() +'.' +file.mimetype.split('/')[1] );
	}
});
var img_multer = multer({storage:storage});

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
app.post('/customGameUpload',img_multer.any(),function(req,res,next){
	console.log("customGame POST!");

	let formData = req.body;
	console.log('form data',formData);
	console.log('file data',req.files);

 	let json_text = {'LineId':""};
 	let dbId = '';

 	for (const [key, value] of Object.entries(formData)) {
 		if(key=='userId'){
 			dbId+= value;
 		}else if(key=='gameName'){
 			dbId+= value;
 		}else{
 			json_text[key]=value;
 		}
	}
	json_text['LineId'] = dbId;

	//更改檔案路徑
	for(var i=0;i<req.files.length;i++){
		json_text[req.files[i].fieldname] = '..\\website\\'+req.files[i].path;
	}

	//使用非同步存進Database
	function saveToDB(dbId,callback){
		return new Promise(function (resolve,reject){
			mongodb.connect(function (err){
				if(err) reject(new Error(err)) ;
				// let query = mongodb.db.collection('GameList').find({'id':dbId}).toArray();
				// console.log(query.length);
				mongodb.db.collection('GameList').findOneAndReplace({"LineId":{$eq:dbId}},json_text,{upsert:true},function(err,res){
					if(err) reject(new Error(err));
					console.log("1 document Replace,Data is:");
					for (const [key, value] of Object.entries(res)) {
						console.log(key,value);
					}
					resolve("Replace Success");
				});
			});
		});
	}
	
	saveToDB(dbId).then(function(resp){
		console.log(resp);
		next();
	})
	.catch(function (res){
		console.log(res);
		res.sendStatus(500);
	});

});

app.post('/customGameUpload',img_multer.any(),function(req,res){
	console.log("I am Next!");
	res.url = './index';
	res.redirect(302,'/index');
});

app.post('/playGame',function(req,res){
	// 網頁方面的請求
	console.log("POST from playGame");
	let data = req.body;
	let id = data.id,gameName=data.gamename;
	function checkFilePath(){
		return new Promise(function(resolve,reject){
			mongodb.connect(function(err){
				if(err) reject(new Error(err));
																				 //這部分是指除了這些以外的需要(未實作)
				mongodb.db.collection('GameList').findOne({"LineId":id+gameName}/*,{_id:0,'LineId':0}*/,function(err,result){
					if(err) reject(new Error(err));
					//console.log(result);
					resolve(result);
				});
			})
		})
	}
	
	checkFilePath().then(function (dbObject){
		console.log('Success');
		pathName = path.join(__dirname,"./userData/json/"+dbObject.LineId+'.json');
		let data = JSON.stringify(dbObject);
		//開啓檔案 讀取('r') 
		fs.open(pathName,'r',function(err,fd){
			if(err){
				console.log(err);
				fs.writeFile(pathName,data,function(err){
					if(err){
						console.log(err);
						return new Error("can not write data to JSON");
					}
					else{
						console.log("Success create User JSON file!");
						return 'Create new json file';
					}
				});
			}

			// var buffr = new Buffer(1024);
			// let output;

			// fs.read(fd,function(err,bytes,buffer){
			// 	if(err) return new Error('Can not read json');
			// 	if(bytes>0){
			// 		console.log(bytes+" 字元被讀取");
			// 		output = buffr.slice(0, bytes).toString()
   //          		console.log(output);
			// 	}
			// });
			console.log("File exist");	//這個會在最後才run到，在不適合的時候出現了(太晚了)
			//關閉檔案
			fs.close(fd,function(err){
				if(err) throw Error("can not close file!");
			});
			
			return "File exist";
		});
	})
	.then(function (result){
		console.log("file is find!");
		console.log(result);	//不知道爲什麽是undefined
		res.writeHead(200,{'Content-Type':'application/json'});
		res.write('Success!');
		res.end();
	})
	.catch(function(error){
		console.log(error);
		res.writeHead(404,{'Content-Type':'application/json'});
		res.write('Can not find user json file!');
		res.end();
	})

	
	// console.log(data);
	// res.writeHead(200,{'Content-Type':'application/json'});
	// res.write(tmp);
	// res.end();
});

app.listen(port,function(){
	console.log("app listening on post 8080!");
});