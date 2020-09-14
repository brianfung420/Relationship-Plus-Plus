window.onload = function() {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1654663712-jX3xwOow";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        console.log("success initLiffOrDie");
        initializeLiffOrDie(myLiffId);
    }

    startGame();
};

function startGame(){
    document.getElementById('game_start').addEventListener('click',function(){
        document.getElementById('game_start').textContent = "Loading...";
        window.open('../games/show1/index.html','_self');
    });
}

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    
    if (!myLiffId) {
        document.getElementById("LineName").textConent = "Can't find LIFF v2 ID";
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
            document.getElementById("LineID").textConent = "Can't loading LIFF";
        });
}

function initializeApp() {
    displayLiffData();
    registerButtonHandlers();
}

function displayLiffData(){
    console.log("Finish to Output~");
}

function registerButtonHandlers(){

    document.getElementById('ClickMe').textContent = "Get Profile and AccessToken";
    document.getElementById('btn_OS').textContent = "Get OS";

    if(liff.getOS()!='web'){
        document.getElementById('login').classList.add("hidden");
    }

    document.getElementById('ClickMe').addEventListener('click',function(){
        document.getElementById('LineLanguage').textContent = liff.getLanguage();
        liff.getProfile().then(function (profile){
            document.getElementById('LineID').textContent = profile.userId;
            document.getElementById('LineName').textContent = profile.displayName;

            const profilePictureDiv = document.getElementById('ic_user');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = 'Profile Picture';
            img.classList.add("userIC");
            profilePictureDiv.appendChild(img);

            document.getElementById('LineStatusMessageField').textContent = profile.statusMessage;
        });
        
        const context = liff.getContext();
        if(context.type=="utou"){
            document.getElementById('LineUtouID').textContent = context.utouId;
        }else if(context.type=="group"){
            document.getElementById('LineGroupID').textContent = context.groupId;
        }else if(context.type=="room"){
            document.getElementById('LineRoomID').textContent = context.roomId;
        }else{
            document.getElementById('LineUtouID').textContent = "Type:"+context.type;
        }
        
        console.log(context.type);

        if(!liff.isLoggedIn() && !liff.isInClient()){
            document.getElementById('LineAccessToken').textContent = 'To get an access token, you need to be logged in. Please tap the "login" button below and try again.';
        }else{
            const AccessToken = liff.getAccessToken();
            document.getElementById('LineAccessToken').textContent = AccessToken;
        }
        
    });

    //Finish
    document.getElementById('btn_OS').addEventListener('click',function(){
        const os = liff.getOS();
        document.getElementById('LineOS').textContent = os;
        if(os=="ios"){
            document.getElementById('LineOS').textContent = "IOS";
        }else if(os=="android"){
            document.getElementById('LineOS').textContent = "Android";
        }else if(os=="web"){
            document.getElementById('LineOS').textContent = "Web";
        }   
    });

    document.getElementById('sendMessage').addEventListener('click',function(){
        if(liff.isInClient()){
            liff.sendMessages([{
                'type':'text',
                'text':'Hello ，感情++'
            }]).then(function(){
                document.getElementById('LineRoomID').textContent = "Message Sent";
            }).catch(function(error){
                document.getElementById('LineRoomID').textContent = "reason:"+error;
                console.log("Reason:"+error);
            });
        }else{
            console.log("Can't Send message");
            document.getElementById('LineRoomID').textContent = "Can't Send message";
        }
    });

    document.getElementById("login").addEventListener('click',function(){
        if(!liff.isLoggedIn()){
            liff.login();
        }
    });
}