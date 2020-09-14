window.onload = function(){
	var httpRequest;
	var jsonObj;
	document.getElementById("btn_click").addEventListener('click',makeRequest);
}

function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'test.json');
    httpRequest.send();
}

function alertContents() {
  	try {
    	if (httpRequest.readyState === XMLHttpRequest.DONE) {
    	  if (httpRequest.status === 200) {
    	    jsonObj = JSON.parse(httpRequest.responseText);
    	    if(jsonObj!=null){
    	    	alert(jsonObj.Game1);
    	    	setJson();
    	    }else{
    	    	alert('JSON Is Null!');
    	    }
    	    
    	  } else {
    	    alert('There was a problem with the request.');
    	  }
    	}
  	}
  	catch( e ) {
  		alert('Caught Exception: ' + e.description);
  	}
}

function setJson(){
	for(var i=0;i<jsonObj.length;i++){
		createLabel(jsonObj[i]);
	}
}

function createLabel(obj){
	var myForm = document.getElementById("GameList");
	myForm.appendChild(setLabeiData(obj.Game1));
	if(obj.Marks-flag){
		myForm.appendChild(setLabeiData(obj.Marks-Question));
	}
	if(obj.Question-flag){
		myForm.appendChild(setLabeiData(obj.Que-Question));
	}
	if(obj.img-flag){
		myForm.appendChild(setLabeiData(obj.img-Question));
	}
}

function setLabeiData(obj){
	var node = document.createElement('label');
	var textNode = document.createTextNode(obj);
	node.appendChild(textNode);
	return node;
}
