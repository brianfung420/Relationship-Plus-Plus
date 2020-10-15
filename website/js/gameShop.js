function showGameInfo(game){
    let infoWin = document.getElementById("show-game-info-win");
    infoWin.style.display = "flex";
}
addLoadEvent(setLIFF);

function switchTab(tabName){
    let gameClassPage = document.getElementsByClassName("game-class-page");
    for(let i = 0; i < gameClassPage.length; i++){
        gameClassPage[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "flex";

}