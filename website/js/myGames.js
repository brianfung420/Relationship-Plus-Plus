function launchGame(gameName){
	let base_url = "https://4cf8374b7fde.ngrok.io" ;
    //alert("Links for you : http://thisisjustatestlink");
    let Uid=sessionStorage.getItem('userID');
	axios({
		method:'POST',
		baseURL:base_url,
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
		// console.log(result.status);
		// console.log(result.statusText);
		// console.log(result.data);
		// console.log(result.headers);
		// console.log(result.config);
		let myJson = result.data;
		localStorage.setItem("userPath",myJson['link']);
		let gameUrl = base_url+"/playGame/"+myJson['link'];
		
		copyUrl2(gameUrl);
	})
	.catch(function(error){
		console.log(error);
	})
}
function copyUrl2(url)
{
	var clip_area = document.createElement('textarea');
	clip_area.textContent = url;
  
	document.body.appendChild(clip_area);
	clip_area.select();
	  
	document.execCommand('copy');
	clip_area.remove();

	alert("已複製好，可貼粘。");
}
addLoadEvent(setLIFF);
addLoadEvent(checkLogin);