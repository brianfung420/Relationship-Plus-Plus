function addGameObject(){
    //alert("addGameObject!");
    var gameObjectList = document.getElementById("game-object-list");

    var gameObjectListItem = document.createElement("div");
    gameObjectListItem.classList.add("game-object-list-item");
    gameObjectListItem.classList.add("row");

    var leftPart = document.createElement("div");
    leftPart.classList.add("col-5");
    leftPart.classList.add("align-middle");

    var objectSkinPreview = document.createElement("div");
    objectSkinPreview.classList.add("object-skin-preview");
    objectSkinPreview.id = "object-skin-preview-2";
    leftPart.appendChild(objectSkinPreview);

    var uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.classList.add("sub-input");
    uploadInput.classList.add("food-input");
    uploadInput.name = "object-skin";
    //uploadInput.setAttribute("onchange", handleUploadPic('object-skin-preview-2','object-skin-2',this.files));
    uploadInput.multiple = "false";
    uploadInput.accept = "image/*";
    uploadInput.required = "true";
    leftPart.appendChild(uploadInput);

    var uploadBtn = document.createElement("button");
    uploadBtn.classList.add("sub-btn");
    uploadBtn.classList.add("food-input");
    uploadBtn.innerText = "上傳照片";
    leftPart.appendChild(uploadBtn);

    gameObjectListItem.appendChild(leftPart);

    var rightPart = document.createElement("div");
    rightPart.classList.add("col-7");

    var subtitle = document.createElement("div");
    subtitle.classList.add("subtitle");
    subtitle.innerText = "獲得的分數";
    rightPart.appendChild(subtitle);

    var pointInput = document.createElement("input");
    pointInput.classList.add("point-input");
    pointInput.type = "text";
    pointInput.name = "object-mark";
    pointInput.required = "true";
    rightPart.appendChild(pointInput);

    var subtitle2 = document.createElement("span");
    subtitle2.classList.add("subtitle");
    subtitle2.innerText = "分";
    rightPart.appendChild(subtitle2);

    var subtitle3 = document.createElement("div");
    subtitle3.classList.add("subtitle");
    subtitle3.innerText = "反饋(ex:難吃、好吃。。。)";
    rightPart.appendChild(subtitle3);

    var feedbackInput = document.createElement("input");
    feedbackInput.classList.add("feedback-input");
    feedbackInput.type = "text";
    feedbackInput.name = "object-feedback";
    feedbackInput.required = "true";
    rightPart.appendChild(feedbackInput);

    gameObjectListItem.appendChild(rightPart);

    gameObjectList.appendChild(gameObjectListItem);


    

}

