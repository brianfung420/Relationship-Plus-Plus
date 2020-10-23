var express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');
const npm = require("npm");
const bodyParser = require('body-parser');
const random = require('string-random')

var formHandle = require('./js/formHandle.js');

//const formidable = require('express-formidable')
//app.use(formidable()); 

const multer = require('multer');
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './userData/img/');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null,  file.originalname.split('.')[0] +Date.now()+"."+file.mimetype.split('/')[1] );
// 	}
// });
// var img_multer = multer({storage:storage});

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

// function setRandomMulter(req,res,next){
// 	let randomID = random(16);
// 	console.log(randomID);
// 	fs.mkdir('./game/dist/'+randomID,function(err){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log('create done!');
// 		}
// 	});
// 	let randomPath = path.join(__dirname+'/game/dist/'+randomID);
// 	var storage_random = multer.diskStorage({
// 		destination: function (req, file, cb) {
// 			console.log("dest randomId:"+randomPath);
// 			cb(null, './game/dist/'+randomPath+"/");
// 		},
// 		filename: function (req, file, cb) {
// 			cb(null,  file.originalname.split('.')[0] +"."+file.mimetype.split('/')[1] );
// 		}
// 	});
	
// 	console.log("setRandomMulter path:"+randomID);
// 	random_multer = new multer({storage:storage_random}); 
// 	req.body['randomId'] = randomID;
// 	console.log(req.body['randomId']);
// 	next();
// }
var sec_random_storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdir('./game/dist/tmp',function(err){
			if(err){
				console.log(err);
			}else{
				console.log('create done!');
			}
		});
		cb(null, './game/dist/tmp/');
	},
	filename: function (req, file, cb) {
		cb(null,  file.originalname.split('.')[0] +"."+file.mimetype.split('/')[1] );
	}
});
let random_multer = multer({storage:sec_random_storage});	//初始時會用上面的路徑設定

//random_multer:使用覆蓋的方式 設定路徑
//客制化完成内容
app.post('/customGameUpload',random_multer.any(),function(req,res,next){		
	console.log("customGame POST!");
	let formData = req.body;

	let LineId = formData['LineId'],GameName = formData['GameName'];
	console.log(LineId,GameName);

	//console.log('form data',formData);
	console.log('file data',req.files);

	let json_text = formHandle.getJson(formData);
	json_text['LineId'] = LineId;
	json_text['GameName'] = GameName;
	json_text['avatarSkin'] = {};
	//更改檔案路徑
	for(var i=0;i<req.files.length;i++){
		//console.log(req.files[i].path);
		switch(req.files[i].fieldname){
			case 'happy':
				//console.log("happy path:"+req.files[i].filename);
				json_text['avatarSkin']['happy'] = req.files[i].filename;
				break;
			case 'unhappy':
				//console.log("unhappy path:"+req.files[i].filename);
				json_text['avatarSkin']['unhappy'] = req.files[i].filename;
				break;
			case 'other-1':
				//console.log("other-1 path:"+req.files[i].filename);
				json_text['avatarSkin']['other-1'] = req.files[i].filename;
				break;
			case 'other-2':
				//console.log("other-2 path:"+req.files[i].filename);
				json_text['avatarSkin']['other-2'] = req.files[i].filename;
				break;
			case 'object-skin':
				let tmp = json_text['arrestedObject'];
				//console.log("object-skin path:"+req.files[i].filename);
				for(var j=0;j<tmp.length;j++){
					if(json_text['arrestedObject'][j]['pic']===''){
							json_text['arrestedObject'][j]['pic'] = req.files[i].filename;
							break;
					}else{
						continue;
					}
				}
				break;
			default:
				console.log("can't handle:"+req.files[i].fieldname);
		}
	}

	let randomPath = random(16);
	let game_Path = "./game/dist/";
	json_text["Path"] = randomPath;

	fs.rename(game_Path+"tmp",game_Path+randomPath,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("succes rename directory");
		}
	});

	console.log("Json_text:",JSON.stringify(json_text));
	let userData_json = JSON.stringify(json_text);

	fs.writeFile(game_Path+randomPath+"/userData.json",userData_json,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("succes write json file");
		}
	});

	//使用非同步存進Database
	function saveToDB(LineId,GameName,callback){
		return new Promise(function (resolve,reject){
			mongodb.connect(function (err){
				if(err) reject(new Error(err)) ;
				// let query = mongodb.db.collection('GameList').find({'id':dbId}).toArray();
				// console.log(query.length);
				mongodb.db.collection('GameList').findOneAndReplace({"LineId":{$eq:LineId},"GameName":{$eq:GameName}},json_text,{upsert:true},function(err,res){
					if(err) reject(new Error(err));
					console.log("1 document Replace");
					resolve("Replace Success");
				});
			});
		});
	}
	
	saveToDB(LineId,GameName).then(function(resp){
		console.log(resp);
		next();
	})
	.catch(function (res){
		console.log(res);
		res.sendStatus(500);
		res.write(res);
	});

});

app.post('/customGameUpload',function(req,res){
	console.log("I am Next!");
	res.url = './index';
	res.redirect(302,'/index');
});

app.post('/playGame',function(req,res){
	// 網頁方面的請求
	console.log("POST from playGame");
	let data = req.body;
	let id = data.LineId,gameName=data.gamename;
	function checkFilePath(){
		return new Promise(function(resolve,reject){
			mongodb.connect(function(err){
				if(err) reject(new Error(err));
																				 //這部分是指除了這些以外的需要(未實作)
				mongodb.db.collection('GameList').findOne({"LineId":id,"GameName":gameName}/*,{_id:0,'LineId':0}*/,function(err,result){
					if(err) reject(new Error(err));
					if(result==null){
						reject("Not Data in databse");
					}
					resolve(result);
				});
			})
		})
	}
	
	checkFilePath().then(function (dbObject){
		console.log('Success');
		pathName = path.join(__dirname,"./userData/json/"+dbObject.LineId+dbObject.GameName+'.json');
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
			console.log("File exist(Function Inner)");	//這個會在最後才run到，在不適合的時候出現了(太晚了)		
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

app.get("/playGame",function(req,res){
	console.log("get playCustGame");
	console.log(__dirname);
	npm.load(()=>npm.run("game"));
	res.end();
});

app.listen(port,function(){
	console.log("app listening on post 8080!");
});