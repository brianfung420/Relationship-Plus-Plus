var express = require('express');
const npm = require("npm");
const app = express();
const port = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const random = require('string-random');
var formHandle = require('./js/formHandle.js');

const multer = require('multer');

//LIFF
const passport = require('passport');
const session = require('express-session');

const mongodb = require('./mongo.js')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const myLiffId = "1654663712-jX3xwOow";

//test balbala

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

// app.get("/myGames",function(req,res){
// 	var path = req.params['id'];
// 	console.log("Get /gameShop");
// 	fs.readFile("./gameShop.html",function(err,data){
// 		if(err){
// 			throw err;
// 		}
// 		res.writeHead(200,{"Content":"text/html"});
// 		res.write(data);
// 		res.end();
// 	});
// })

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

var sec_random_storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let path = req.body['path'];
		fs.mkdir('./game/userData/'+path,function(err){
			if(err){
				console.log(err);
			}else{
				console.log('create done!');
			}
		});
		cb(null, './game/userData/'+path);
	},
	filename: function (req, file, cb) {
		if(file.fieldname==="happy"){
			cb(null,  "goal" +"."+file.mimetype.split('/')[1] );
		}else if(file.fieldname==="unhappy"){
			cb(null,  "unHappy" +"."+file.mimetype.split('/')[1] );
		}else if(file.fieldname==="object-skin"){
			cb(null,  "food1" +"."+file.mimetype.split('/')[1] );
		}else{
			cb(null,  file.originalname.split('.')[0] +"."+file.mimetype.split('/')[1] );
		}
	}
});

let random_multer = multer({storage:sec_random_storage});	//初始時會用上面的路徑設定

//random_multer:使用覆蓋的方式 設定路徑
//客制化完成内容
app.post('/customGameUpload',random_multer.any(),function(req,res,next){		
	console.log("customGame POST!");
	let formData = req.body;
	let LineId = formData['LineId'],GameName = formData['GameName'],path = formData['path'];
	
	saveData(formData,req.files);

	saveToDB(LineId,GameName,path).then(function(resp){
		console.log(resp);
		res.setHeader("Content-Type","application/json");
		res.json({'path':path,'url':'./index',"game":GameName});
		res.end();
	})
	.catch(function (resp){
		console.log(resp);
		res.writeHead(500,{"Content-Type":"application/json"});
		res.write(resp);
		res.end();
	});
});

function saveData(formData,files){
	let LineId = formData['LineId'],GameName = formData['GameName'],path = formData['path'];
	//console.log(LineId,GameName);
	//console.log('form data',formData);
	//console.log('file data',req.files);

	let json_text = formHandle.getJson(formData);
	json_text['LineId'] = LineId;
	json_text['GameName'] = GameName;
	json_text['path'] = path;
	json_text['avatarSkin'] = {};
	//更改檔案路徑
	for(var i=0;i<files.length;i++){
		//console.log(req.files[i].path);
		switch(files[i].fieldname){
			case 'happy':
				//console.log("happy path:"+req.files[i].filename);
				json_text['avatarSkin']['happy'] = files[i].filename;
				break;
			case 'unhappy':
				//console.log("unhappy path:"+req.files[i].filename);
				json_text['avatarSkin']['unhappy'] = files[i].filename;
				break;
			case 'other-1':
				//console.log("other-1 path:"+req.files[i].filename);
				json_text['avatarSkin']['other-1'] = files[i].filename;
				break;
			case 'other-2':
				//console.log("other-2 path:"+req.files[i].filename);
				json_text['avatarSkin']['other-2'] = files[i].filename;
				break;
			case 'object-skin':
				let tmp = json_text['arrestedObject'];
				//console.log("object-skin path:"+req.files[i].filename);
				for(var j=0;j<tmp.length;j++){
					if(json_text['arrestedObject'][j]['pic']===''){
							json_text['arrestedObject'][j]['pic'] = files[i].filename;
							break;
					}else{
						continue;
					}
				}
				break;
			default:
				console.log("can't handle:"+files[i].fieldname);
		}
	}

	// let randomPath = random(16);
	let game_Path = "./game/userData/";
	// json_text["path"] = randomPath;
	
	console.log("Json_text:",JSON.stringify(json_text));
	let userData_json = JSON.stringify(json_text);

	fs.writeFile(game_Path+path+"/userData.json",userData_json,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("succes write userData json file");
		}
	});
}

//使用非同步存進Database
function saveToDB(LineId,GameName,randomPath,callback){
	return new Promise(function (resolve,reject){
		console.log(LineId,GameName,randomPath);
		mongodb.connect(function (err){
			if(err) reject("Can't connect to Database") ;
			// let query = mongodb.db.collection('GameList').find({'id':dbId}).toArray();
			// console.log(query.length);
			mongodb.db.collection('GameList').findOne({"LineId":{$eq:LineId}},function(err,result){
				if(err){
					console.log(err);
				}
				//	result有可能是空的 所以需要判斷是不是null
				if(result==null){			//是null的話就新增資料到DB
					let data = {};
					data['LineId'] = LineId;
					data['game'] = [];
					data['game'][0] = {};
					data['game'][0][GameName] = randomPath;
					mongodb.db.collection('GameList').insertOne(data,function(err,res){
						if(err) reject("Can't insert data to Database");
					});
					console.log("insert Data!");
					resolve("Insert Success");
				}
				else{
					console.log("update Data");
					let flag = 0,exist_path=0,index;

					//查找DB的資料有沒有和上傳的的GameName相同
					for(const [key,value] of Object.entries(result['game'])){
						console.log(key,value);
						for(const [inner_key,inner_value] of Object.entries(value)){
							console.log(inner_key,inner_value);
							if(inner_key===GameName){
								flag=1;
								exist_path = inner_value;
								index = key;
								//在資料庫找到有該游戲的資料，刪掉路徑的folder
								fs.rmdir("./game/userData/"+inner_value,{recursive:true},function(err){
									if(err){
										throw err;
									}
									console.log("Delete folder:"+inner_value);
								});
							}
						}
					}

					console.log(index,exist_path);
					if(flag){		//有的話就將DB的部分改成上傳的GameName和path
						let data = {};
						data[GameName] = randomPath;
						let tmp = "game."+index;		//重點部分
						mongodb.db.collection('GameList').updateOne({"LineId":{$eq:LineId}},{$set:{[tmp]:data}},function(err,res){
							if(err){
								console.log(err);
								reject(new "Can't update data to Database");
							}
							//console.log(res);
							resolve("Update Success");
						});
					}else{			//還沒實測，可能需要花時間去研究
						let data = {};
						data[GameName] = randomPath;
						mongodb.db.collection('GameList').updateOne({"LineId":{$eq:LineId}},{$addToSet:data},function(err,res){
							if(err){
								console.log(err);
								reject("Can't update data to Database");
							}
							//console.log(res);
							resolve("Update Success");
						});
					}
				}
			});
		});
	});
}

app.post('/buildNpm',function (req,res){
	let userPath = req.body;
	//console.log(req.body);
	let localPath = userPath["userPath"];
	console.log("userPath:"+localPath);
	//set precess.env
	process.env['userPath'] = localPath;
	console.log(process.env.userPath);

	npm.load(()=>npm.run("webpackBuild"));
	// function waitWebpack(){
	// 	return new Promise(function(resolve,reject){
	// 		npm.load(()=>npm.run("webpackBuild"));
	// 	});
	// }

	res.setHeader("Content-Type","application/json");
	res.json({"message":"ok"});
	res.end();
});

//客制化界面查詢資料庫是否有該用戶的資料
app.post('/getPreviousData',function(req,res){
	let json = req.body;
	console.log('Post getPreviousData');
	console.log(json);
	let LineId = json['LineId'],gamaname = json['gameName'];

	//使用非同步存進Database
	function checkData(LineId,GameName,callback){
		return new Promise(function (resolve,reject){
			mongodb.connect(function (err){
				if(err) reject("Can't connect to Database") ;
				mongodb.db.collection('GameList').findOne({"LineId":{$eq:LineId}},function(err,result){
					if(err){
						console.log(err);
					}
					//	result有可能是空的 所以需要判斷是不是null
					if(result==null){			//是null的話就新增資料到DB
						console.log("No Data");
						reject({});
					}else{
						console.log("DB have Data~");
						let tmp = result['game'][0];
						//只針對一種Game
						if(typeof tmp[GameName]!='string'){
							console.log("is undefined");
							reject({});
						}else{
							console.log("is find");
							let path = tmp[GameName];
							let temp = fs.readFileSync("./game/userData/"+path+"/userData.json");
							let DB_data = JSON.parse(temp);
							resolve(DB_data);
							resolve({"message":"is find"});
						}
					}
				});
			});
		});
	}
	res.setHeader('Content-Type',"application/json");
	checkData(LineId,gamaname).then(function(response){
		res.json(response);
		res.end();
	})
	.catch(function(response){
		res.json(response);
		res.end();
	});
});

app.post("/playGame",function(req,res){
	console.log("get playCustGame");
	let LineId = req.body.LineId,GameName = req.body.gamename;
	mongodb.connect(function (err){
		if(err) {
			res.writeHead(404,{'Content-Type':'application/json'});
			res.write("Database crash");
			res.end();
		}
		mongodb.db.collection('GameList').findOne({"LineId":{$eq:LineId}},function(err,result){
			if(err){
				console.log(err);
			}
			//	result有可能是空的 所以需要判斷是不是null
			if(result==null){			//是null的話就新增資料到DB
				res.writeHead(200,{'Content-Type':'application/json'});
				res.write("No Data in database");
				res.end();
			}
			else{
				console.log("update Data");
				//查找DB的資料有沒有和上傳的的GameName相同
				let db_path,flag=0;
				for(const [key,value] of Object.entries(result['game'])){
					console.log(key,value);
					for(const [inner_key,inner_value] of Object.entries(value)){
						console.log(inner_key,inner_value);
						if(inner_key===GameName){
							flag=1;
							db_path = inner_value;
							index = key;
						}
					}
				}
				console.log(db_path);
				if(flag){
					res.setHeader("Content-Type","application/json");
					//res.writeHead(200,{'Content-Type':'application/json'});
					res.json({"link":db_path});
					res.end();
				}else{
					res.writeHead(200,{'Content-Type':'application/json'});
					res.write("No this game");
					res.end();
				}
				
				//npm.load(()=>npm.run("webpackBuild"));
			}
		});
	});
});

app.get("/playGame/:id",function(req,res){
	var path = req.params['id'];
	fs.readFile("./game/dist/"+path+"/index.html",function(err,data){
		if(err){
			console.log("Not game data!");
			res.writeHead(404,{'Content-Type':'text/html'});
			res.write("I am so sorry,server No your game data! :(");
			res.end();
		}
		if(data){
			console.log(data);
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		}
	})
});

app.post("/playGame/:id",function(req,res){
	var path = req.params['id'];
	console.log(path);
	fs.readFile("./game/userData/"+path+"/userData.json",function(err,data){
		if(err){
			console.log("Not game data!");
			res.writeHead(404,{'Content-Type':'application/json'});
			res.write("I am so sorry,server No your image data! :(");
			res.end();
		}
		if(data){
			let output = {}
			let json = JSON.parse(data);
			output['avatarSkin'] = json['avatarSkin'];
			output['arrestedObject'] = json['arrestedObject'];
			console.log(output);
			res.setHeader('Content-Type','application/json');
			res.json(output);
			res.end();
		}
	})
});

app.listen(port,function(){
	console.log("app listening on post 8080!");
});