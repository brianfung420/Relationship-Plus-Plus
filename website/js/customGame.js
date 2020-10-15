// addLoadEvent(setButton);

// addLoadEvent(setLIFF).then(addLoadEvent(getLiffUserId));
window.onload = function(){
    setLIFF();
    checkLogin();
    setButton();
    sessionStorage.setItem('gameName','CatchFood');
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
  //   	console.log("coming");
  //   	let json_obj = '{"id" : '+id+",";
  //   	json_obj+=createObject("opening","dialogue",open_input);

  //   	//json_obj+=createObject("avatar","skin",skin_img_input);

  //   	json_obj+=insertObject(food_img_input,obj_point_input,obj_feedback_input);
  //       json_obj+=createEndingFeedback(ending_point_input,ending_feedback_input);

 	// 	//Final to add
  //   	json_obj += "}";

  //   	console.log("json_obj:"+json_obj);

		// let json_file = JSON.parse(json_obj);
		
		// console.log(json_file);
    }else{
    	alert("請上傳指定資料");
    }
   	//console.log(img_input);
    //
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

function checkFormData(){
    let flag=0;
    var from = document.getElementsByName('DesignForm')[0];
    var formData = new FormData(from);

    for(var [key,value] of formData){
        if(value===''){
            flag = 1;
        }
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


    // let inputElement = document.getElementsByTagName('input');
    // let imgElement = document.getElementsByTagName('img');
    // let userID = sessionStorage.getItem('userID');
    // let json_text = {};
    // let json_file = {};
    
    // for(var i=0;i<inputElement.length;i++){
    //     if(inputElement[i].value!='' && inputElement[i].type!='file'){
    //         json_text[inputElement[i].name] = inputElement[i].value;
    //     }
    // }
    // for(var i=0;i<imgElement.length;i++){
    //     //console.log('Name:'+imgElement[i].name+",src:"+imgElement[i].src)
    //     if(imgElement[i].src!=''){
    //         json_file[imgElement[i].name] = imgElement[i].src;
    //     }
    // }

    // uploadImage("/customGameUpload",json_text,json_file);

    //console.log('text:'+JSON.stringify(json_text));
    //console.log('file:'+JSON.stringify(json_file));
}

// function createObject(name,tagName,data){
// 	let text = '"' + name + '":[';
// 	for(let i=0;i<data.length;i++){
// 		text+= '{ "'+ tagName+'": "'+data[i]+'"}';
//         if(!isLast(i,data.length)){
//             text+=",";
//         }
// 	}
// 	text += '],';
// 	return text;
// }

// //將Game object整合在同一個json區塊裏
// function insertObject(img,point,feedback){
// 	let text=' "Object" : [ ';
// 	for(let i=0;i<point.length;i++){
// 		text+= '{ "img" :"'+"123" +'", "point" : " '+point[i]+' ", "feedback" : "'+feedback[i]+'"}';
//         if(!isLast(i,point.length)){
//             text+=",";
//         }
// 	}
// 	text += '],';
// 	return text;
// }

// function createEndingFeedback(point,feedback){
//     let text=' "ending" : { ';
//     text+= ' "more-than-point" :"'+point[0] +'", "more-than-feedback" : "'+feedback[0]+'",';
//     text+= ' "middle-feedback" : " '+feedback[1]+' ",';
//     text+= ' "less-than-point" :"'+point[1] +'", "less-than-feedback" : "'+feedback[2]+'"}';

//     return text;
// }

function isNullInput(input){
	if(input[0]=="Error"){
		return true;
	}else{
		return false;	
	}
}

// // check the last number in for.
// function isLast(now,total){
//     if(now==total-1){
//         return true;
//     }
//     else{
//         return false;
//     }
// }
