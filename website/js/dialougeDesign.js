function addDialougeInput(){
    var dialougeList = document.getElementById("dialouge-list");
    var dialougeAmount = document.getElementsByClassName("dialouge-title").length;
    var newInputLable = document.createElement("label");
    var newInput = document.createElement("input");

    newInputLable.classList.add("dialouge-title");
    newInputLable.classList.add("subtitle");
    newInputLable.innerHTML +='標題' + (dialougeAmount+1);

    newInput.classList.add("dialouge-content");
    newInput.type = "text";

    dialougeList.appendChild(newInputLable);
    dialougeList.appendChild(newInput);

    var list = document.getElementsByClassName("dialouge-content");

}