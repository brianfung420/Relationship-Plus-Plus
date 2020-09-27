window.onload = function(){
    setLIFF();
}

function handleUploadPic(previewBox,input_file){
    let previewDiv = document.getElementById(previewBox);

    for (let i = 0; i < input_file.length; i++) {
        let file = input_file[i];
        let imageType = /image.*/;
    
        if (!file.type.match(imageType)) {
          continue;
        }

        //console.log(file);
    
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

function closeWin(winName){
  let win = document.getElementById(winName);
  win.style.display = "none";
}


function setLIFF(){
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server
                                //defaultLiffId = "1654663712-jX3xwOow"

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('./send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {

            });
    } else {
        myLiffId = defaultLiffId;
        console.log("success initLiffOrDie");
        initializeLiffOrDie(myLiffId);
    }
}

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        console.log("Liff is die");
    } else {
        console.log("Liff is alive~");
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            console.log("Initing...");
            initializeApp();
        })
        .catch((err) => {
            console.log("Can't loading LIFF");
            console.log(err);
        });
}

function initializeApp(){
    if(!liff.isInClient()){
        document.getElementById("loginBtn").addEventListener('click',function(){
            if(!liff.isLoggedIn()){
                console.log("need to login");
                liff.login({ redirectUri: "https://localhost:8080" });
            }else{
                getUserProfile();
            }
        });
    }
    else{
        getUserProfile();
    }
    
}

function getUserProfile(){
    liff.getProfile().then(function(profile){
        const name = profile.displayName;
        const id = profile.userId;
        document.getElementById('loginBtn').textConent = name;
    }).catch(function(err){
        console.log("initApp:"+err);
    });
}