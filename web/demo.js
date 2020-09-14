window.onload = function(e){
	document.getElementById('ClickMe').textContent = "Hello";
	initApp();
	liff.init(function (data){
		document.getElementById('ClickMe').textContent = "initing";
		getData(data);
	});
}

	//	問題 OS找不出來 Context也call不出來
	//  用網頁版的line也不能跑出來
function getData(data){

	document.getElementById('LineLanguage').textContent = data.language;

	document.getElementById('ClickMe').textContent = "Hello, Your Language is " + data.language;

	document.getElementById('ClickMe').addEventListener('click',function(){
		const profile = liff.getProfile();
		document.getElementById('LineID').textContent = profile.userId;
		document.getElementById('LineName').textContent = profile.displayName;
		document.getElementById('LineIcon').src = profile.pictureUrl;
		document.getElementById('LineIcon').alt = "Profile Picture";

		const Object context = liff.getContext();
		document.getElementById('LineUtouID').textContent = context.utou;
		document.getElementById('LineRoomID').textContent = context.room;
		document.getElementById('LineGroupID').textContent = context.group;
		console.log(context);

		const AccessToken = liff.getAccessToken();
		document.getElementById('LineAccessToken').textContent = AccessToken;
		console.log(AccessToken);
	});

	document.getElementById('LineOS').textContent = "Loading...";

	document.getElementById('btn_OS').addEventListener('click',function(){
		document.getElementById('LineOS').textContent = "finding...";
		const os = liff.getOS();
		document.getElementById('LineOS').textContent = os;
		if(os=="ios"){
			document.getElementById('LineOS').textContent = "IOS";
		}else if(os=="android"){
			document.getElementById('LineOS').textContent = "Android";
		}else if(os=="web"){
			document.getElementById('LineOS').textContent = "Web";
		}	
	});
}

function initApp(){
	document.getElementById("LineIcon").src = "ic_profile.png";
	startGame();
}

function startGame(){
	document.getElementById('game_start').addEventListener('click',function(){
		document.getElementById('game_start').textContent = "Loading...";
		window.open('../games/show1/index.html','_self');
	});
}
