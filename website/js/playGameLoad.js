async function loadData(){
    //需要讓這部分先執行才可以執行bundle的部分！！！
    var id = sessionStorage.getItem('userPath');
    console.log('post loadData');
    fetch("/playGame/"+id,{
        method:'POST',
        body:id
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Network is not ok!");
        }
    }).then(function(myjson){
        //console.log(myjson);
        sessionStorage.setItem('happy',myjson['avatarSkin']['happy']);
        sessionStorage.setItem('food1',myjson['arrestedObject'][0]['pic']);
        sessionStorage.setItem('unHappy',myjson['avatarSkin']['unhappy']);
        console.log('post finish!');
    }).catch(function(e){
        console.log("the problem is "+e)
    });
}