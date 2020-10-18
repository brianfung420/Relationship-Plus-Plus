function handleUploadPic(previewBox,tagName,input_file){
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
        img.name = tagName;
        img.classList.add("inner-img");
        img.classList.add("obj");
        img.file = file;
        previewDiv.appendChild(img);
        
        let reader = new FileReader();
        reader.onload = (function(aImg) { 
        	return function(e) { 
                aImg.src = e.target.result;
            }; })(img);
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

function uploadImage(url,file){
    id = sessionStorage.getItem('userID');
    gameName = sessionStorage.getItem('gameName');
    file.set('LineId',id);
    file.set('GameName',gameName);
        //console.log(file);
        // for (var key in text){
        //     formData.append(key, text[key]);
        // }
        // for (var key in file){
        //     const img_Blob = DataURITiBlob(file[key]);
        //     const type = img_Blob.type;
        //     let img_type=dataURI.split('/')[1];
        //     formData.append(key, img_Blob,key+'.'+img_type);
        // }

    fetch(url, {    //不用set header就可以上傳資料(content-type) 
            method: 'POST',
            body: file
    })
    .then(function(response){
        if(response.ok){
            return response.url;
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(url){
        window.location.href = url;
    })
    .catch(function(err) {
        console.log('There has been a problem with your fetch operation:', err);
    });
}

function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    //console.log("splitDataURI:"+splitDataURI);
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    //console.log("byteString:"+byteString);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    //console.log("mimeString:"+mimeString);

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
}

function checkLogin(){
    let myLiffId = "";
    myLiffId = sessionStorage.getItem('liffID');
    console.log(myLiffId);
    if(!myLiffId){
        console.log("is die!");
    }else{
        liff.init({
            liffId: myLiffId
        }).then(function(){
            //console.log("liffID:"+myLiffId);
            if(!liff.isLoggedIn()){
                liff.login();
            }
        }).catch((err) => {
            console.log("Can't loading LIFF");
            console.log(err);
        });
    }
}