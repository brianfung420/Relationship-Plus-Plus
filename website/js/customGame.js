function handlePreviewGame(){
    //need to get all element from customHame.html page and feed to preview phraser games

    let flag=0;
    let open_input = getInputArray("dialouge-content");
    if(isNullInput(open_input)){
    	flag=1;
    }
   	//console.log(open_input);

   	let img_input = getInputArray("sub-input");
   	if(isNullInput(img_input)){
    	flag=1;
    }

    let marks_input = getInputArray("point-input");
    if(isNullInput(marks_input)){
    	flag=1;
    }

    let feedback_input = getInputArray("feedback-input");
    if(isNullInput(feedback_input)){
    	flag=1;
    }

    

    if(!flag){
    	let json_obj = "";
    	json_obj+=createJson("opening","dialogue",open_input);

    	json_obj+=createJson("avatar",img_input);


 		//Final to add
    	json_obj += "}";

		console.log(json_obj);
    }else{
    	alert("輸入全部資料");
    }

    
   
	
   	//console.log(img_input);
    //
}

function createJson(name,tagName,data,img){
	let json_text = '{"' + name + '":[';
	for(let i=0;i<data.length;i++){
		json_text+= '{ "'+ tagName+'": "'+data[i]+'"},'
	}
	json_text += ']';
	return json_text;
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

function isNullInput(input){
	if(input[0]=="Error"){
		return true;
	}else{
		return false;	
	}
}