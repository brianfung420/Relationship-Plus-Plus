function launchGame(gameName){
    //alert("Links for you : http://thisisjustatestlink");
    let Uid=sessionStorage.getItem('userID');
	axios({
		method:'POST',
<<<<<<< HEAD
<<<<<<< HEAD
		baseURL:'https://999432274352.ngrok.io',
=======
		baseURL:'https://62b83c99d18c.ngrok.io',
>>>>>>> div
=======
		baseURL:'https://5a42ed0e07aa.ngrok.io',
>>>>>>> master
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
		let myJson = result.data;
		alert("你的游戲連結:"+"https://5a42ed0e07aa.ngrok.io"+myJson['link'])
	})
	.catch(function(error){
		console.log(error);
	})
}

addLoadEvent(setLIFF);
addLoadEvent(checkLogin);