window.onload = function(){
	console.log("Welcome to design catch food");
	setUploadButton();
}

function handleUploadPic(previewBox,files){
    let previewDiv = document.getElementById(previewBox);

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let imageType = /image.*/;

        console.log(i+":Name="+file.name+" ,Size="+file.size+" ,Type="+file.type);
    
        if (!file.type.match(imageType)) {
          continue;
        }
    
        let img = document.createElement("img");
        img.classList.add("inner-img");
        img.classList.add("obj");
        img.file = file;
        previewDiv.appendChild(img);
        
        let reader = new FileReader();
        reader.onload = (function(aImg) { 
        	return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}

function setUploadButton(){
	let btn_list = document.getElementsByClassName("sub-btn");
	let input_list = document.getElementsByClassName("sub-input");
	console.log("btn size:"+btn_list.length+" ,input size:"+input_list.length);

	for(let i=0;i<btn_list.length;i++){
		console.log(i);
		btn_list[i].addEventListener("click",function(e){
			if(input_list[i]){
				input_list[i].click();
			}
			e.preventDefault();
		},false);
	}
}


function closeWin(winName){
  let win = document.getElementById(winName);
  win.style.display = "none";
}
