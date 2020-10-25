let userLineId;

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
                console.log("error:"+error);
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
        sessionStorage.setItem('liffID',myLiffId);
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
    if(!liff.isLoggedIn() && !liff.isInClient()){ //!liff.isInClient() && { redirectUri: "https://localhost:8080" }
        document.getElementById("loginBtn").addEventListener('click',function(){
            if(!liff.isLoggedIn()){
                console.log("need to login");
                liff.login({ redirectUri: "https://d2b36a1092ea.ngrok.io/index.html" });    //回傳的網址
            }else{
                getUserProfile();
            }
        });
    }
    else{
        console.log("getUserProfile!");
        getUserProfile();
    }
    
}

function getUserProfile(){
    liff.getProfile().then(function(profile){
        const name = profile.displayName;
        const id = profile.userId;
        userLineId = id;
        console.log("name:"+name+" id:"+id);
        document.getElementById('loginBtn').textContent = name;
        getLiffUserId();
    }).catch(function(err){
        console.log("initApp:"+err);
    });
}

function getLiffUserId(gameName){
    //setLIFF();
    console.log("getLiffUserId:"+userLineId);
    sessionStorage.setItem('userID',userLineId);
    return userLineId+gameName;
}