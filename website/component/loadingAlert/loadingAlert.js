function lockScreen(){
    var body = document.querySelector('body');
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
}
function unlockScreen(){
    var body = document.querySelector('body');
    body.style.height = '100%';
    body.style.overflowY = 'scroll';
}

function closeLoadingWindow(){
    document.getElementById('loadingAlert').style.display = 'none';
    unlockScreen();
}

function showLoadingWindow(){
    document.getElementById('loadingAlert').style.display = 'block';  
    lockScreen();

}
/*
window.onload = function(){
    showLoadingWindow();
}
*/