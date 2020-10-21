function launchGame(gameName){
    //alert("Links for you : http://thisisjustatestlink");
    let Uid=sessionStorage.getItem('userID');
	axios({
		method:'POST',
		baseURL:'https://d568d94e9799.ngrok.io',
		url:'/playGame',
		'Content-Type':'application/json',
		data:{
			LineId : Uid,
			gamename : gameName
		},
		// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
		timeout: 1000,
	})
	.then(function(result){
		console.log(result.status);
		console.log(result.statusText);
		console.log(result.data);
		console.log(result.headers);
		console.log(result.config);
	})
	.catch(function(error){
		console.log(error);
	})
}

addLoadEvent(setLIFF);
addLoadEvent(checkLogin);