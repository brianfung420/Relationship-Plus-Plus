// addLoadEvent(setButton);

// addLoadEvent(setLIFF).then(addLoadEvent(getLiffUserId));
window.onload = function(){
    setLIFF();
    checkLogin();
    setButton();
    sessionStorage.setItem('gameName','CatchFood');
    getPreviousData();
}

function handlePreviewGame(){
    //need to get all element from customHame.html page and feed to preview phraser games

    let flag=0;
   	//console.log(open_input);

   	console.log("handle");

   	let skin_img_input = getInputArray("skin-input");
   	if(isNullInput(skin_img_input)){
    	flag=1;
    }

    let food_img_input = getInputArray("food-input");
   	if(isNullInput(food_img_input)){
    	flag=1;
    }

    let open_input = getInputArray("dialouge-content");		//開場白變數
    let obj_point_input = getInputArray("point-input");			//分數變數
    let obj_feedback_input = getInputArray("feedback-input");	//回饋變數

    let ending_point_input = getInputArray("point");
    let ending_feedback_input = getInputArray("feedback-content");

    if(!flag){

    }else{
    	alert("請上傳指定資料");
    }
}

function getInputArray(id){
    let inputBox = document.getElementsByClassName(id);
    let input=[];
    let nullInput=["Error"];
    let flag=0;
    for(let i=0;i<inputBox.length;i++){
        if(inputBox[i].value==""||inputBox[i].value==null){
            inputBox[i].classList.add("isNull");
            nullInput.push(i);
            flag=1;
        }else{
            input.push(inputBox[i].value);
        }
    }
    if(flag){
        return nullInput;
    }else{
        return input;
    }
}

function setButton(){
    let btn_list = document.getElementsByClassName("sub-btn");
    let input_list = document.getElementsByClassName("sub-input");
    console.log("btn size:"+btn_list.length+" ,input size:"+input_list.length);

    for(let i=0;i<btn_list.length;i++){
        //console.log(i);
        btn_list[i].addEventListener("click",function(e){
            if(input_list[i]){
                input_list[i].click();
            }
            e.preventDefault();
        },false);
    }
}

function postDesign(formData){
    uploadImage('/customGameUpload',formData);
}

//上傳定制資料
function uploadImage(url,file){
    id = sessionStorage.getItem('userID');
    gameName = sessionStorage.getItem('gameName');
    file.set('LineId',id);
    file.set('GameName',gameName);

    fetch(url, {    //不用set header就可以上傳資料(content-type) 
            method: 'POST',
            body: file
    })
    .then(function(response){
        if(response.ok){
            return response.json();
            //console.log("url:"+url);
            //window.location.href = url;
        }
        else{
            throw new Error('Network response was not ok.');
        }
    })
    .then(function(myjson){
        window.localStorage.setItem('userPath',myjson['path']);
        window.localStorage.setItem('gamaName',myjson['game']);
        //alert("已上傳資料，將跳轉到主頁");
        //window.location.href = myjson['url'];
        //npm.load(()=>npm.run("webpackStart"));
        //console.log("startGame");
    })
    .catch(function(err) {
        console.log('There has been a problem with your fetch operation:', err);
    });
}

function checkFormData(){
    let flag=0;
    var from = document.getElementsByName('DesignForm')[0];
    var formData = new FormData(from);

    for(var [key,value] of formData){
        if(value===''){
            flag = 1;
        }
        console.log(key+":"+value)
    }

    let skin_img_input = getInputArray("skin-input");
    if(isNullInput(skin_img_input)){
        alert('skin img is Null');
        flag=1;
    }

    let food_img_input = getInputArray("food-input");
    if(isNullInput(food_img_input)){
        alert('food img is Null');
        flag=1;
    }

    console.log("check Data flag:"+flag);

    if(!flag){
        console.log("Go to POST");
        postDesign(formData);
    }

}

function getPreviousData(){
    let id = sessionStorage.getItem('userID');
    let gameName = sessionStorage.getItem('gameName');
    let data = {"LineId":id,"gameName":gameName}
    fetch("/getPreviousData", {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "content-type":'application/json'
            }
    })
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('Network response was not ok.');
        }
    })
    .then(function(myjson){
        console.log("GetPreviousData");
        //可以用myjson獲取userData裏面的值
        
    })
    .catch(function(err) {
        console.log('There has been a problem with your fetch operation:', err);
    });
}

function buildNpm(){
    let tmp = localStorage.getItem("userPath");
    let userPath = {"userPath":tmp};
    let json_path = JSON.stringify(userPath);
    //console.log(json_path);
    fetch("./buildNpm", {    //不用set header就可以上傳資料(content-type) 
        headers:{"Content-Type":"application/json"},
        method: 'POST',
        body:json_path
    })
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('Network response was not ok.');
        }
    })
    .then(function(myjson){
        console.log(myjson['message']);
    })
    .catch(function (err) {
        console.log(err);
    })
}

function isNullInput(input){
	if(input[0]=="Error"){
		return true;
	}else{
		return false;	
	}
}
/*
const npm = require("npm");
//import runNpmStart from './handleNpm';
function runNpm(){
    console.log("wow");
    npm.load(()=>npm.run("webpackStart"));
    
}
*/
