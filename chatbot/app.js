const express = require('express');

// LIFF 部分
// const app2 = express(); 
// const path = require('path');
// var port = process.env.PORT || 8080;
// app2.use(express.static(path.join(__dirname, '')));
// app2.get('/', function (req, res) { 
//     res.sendfile(__dirname + '/index.html'); 
// });

// app2.listen(port, function() {
//     console.log("Listening on Port 3000");
// });

//ChatBot 部分
const app = express();
const linebot = require('linebot');// 判別開發環境

if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
	require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

const bot = linebot({
 channelId: process.env.CHANNEL_ID,
 channelSecret: process.env.CHANNEL_SECRET,
 channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const linebotParser = bot.parser();
bot.on('message', function (event) {
 	console.log(event);
 	switch(event.message.text){
 		case "模板展示":
 			event.reply("請前往該網址："+"https://liff.line.me/1654663712-jX3xwOow");
 			break;
 		case "訂製遊戲":
 			event.reply("請前往該網址："+"https://liff.line.me/1654663712-e4Mk8n28");
 			break;
 		default:
 			event.reply("拍謝，我不是很懂你的意思喔");
 			break;
 	}
});

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
 	console.log('Express server start')
});
