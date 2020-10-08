function marqueeSlider(){
    let marqueeContent = document.getElementsByClassName("marquee-content-item");
    console.log(marqueeContent.length);
    for(let i = 0; i < marqueeContent.length; i++){
        marqueeContent[i].style.left = (i + 40);
    }
}
marqueeSlider();

window.onload = function(){
    setLIFF();
}