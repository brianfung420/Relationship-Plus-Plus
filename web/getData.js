
function getImg(){
	var myForm = document.createElement('form');
	var node = document.createElement('label');
	var textNode = document.createTextNode('請上傳圖片:');
	node.appendChild(textNode);
	var imgInput = document.createElement('input');
	imgInput.setAttribute("type","file");
	myForm.appendChild(node);
	myForm.appendChild(imgInput);
	document.getElementById("light").appendChild(myForm);
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
	btn_Finish();
}

function getAnswer(jsonObj){
	var myForm = document.createElement('form');
	var node = document.createElement('label');
	var textNode = document.createTextNode('Json檔案的相關問題：(e.g. 你希望多少分顯示特別的内容？)');
	node.appendChild(textNode);
	var textInput = document.createElement('input');
	textInput.setAttribute("type","text");
	myForm.appendChild(node);
	myForm.appendChild(textInput);
	document.getElementById("light").appendChild(myForm);
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
	btn_Finish();
}

function getMarks(){
	btn_Finish();
}

function btn_Finish(){
    var finish_btn = document.createElement('button');
    var textNode = document.createTextNode("Finish");
    finish_btn.appendChild(textNode);
    finish_btn.setAttribute("id","finish_btn");
    document.getElementById("light").appendChild(finish_btn);
    setButton();
}

function setButton(){
	document.getElementById('finish_btn').addEventListener('click',function(){
        console.log("Click");
		document.getElementById('light').style.display='none';
	    document.getElementById('fade').style.display='none';
	    var myNode = document.getElementById("light");
		var fc = myNode.firstChild;

		while(fc) {
			console.log("clearing...");
	    	myNode.removeChild(fc);
	    	fc = myNode.firstChild;
		}
    });
}
    
    

function clear(){
	
}


function getQuestionType(){
	var temp = document.getElementById("QuestionType");
	var userOption = temp.options[temp.selectedIndex].value;
	return userOption;
}

function getQuestion(){
	var userOption = getQuestionType();
	if(userOption=="Image"){
		getImg();
	}else if(userOption=="Question"){
		getAnswer();
	}else if(userOption=="Marks"){
		getMarks();
	}else if(userOption=="0"){
		window.alert("請選擇類型!");
	}
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


