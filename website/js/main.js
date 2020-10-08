function handleUploadPic(previewBox,input_file){
    let previewDiv = document.getElementById(previewBox);
    while (previewDiv.firstChild) {
        previewDiv.removeChild(previewDiv.lastChild);
    }

    for (let i = 0; i < input_file.length; i++) {
        let file = input_file[i];
        let imageType = /image.*/;
    
        if (!file.type.match(imageType)) {
          continue;
        }

        //console.log(file);
    
        let img = document.createElement("img");
        img.file = null;
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

function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

function closeWin(winName){
  let win = document.getElementById(winName);
  win.style.display = "none";
}