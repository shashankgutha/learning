var button = document.getElementById("enter");
var login_button = document.getElementById("login");
var logout_button = document.getElementById("logout");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
const localStorageAppData = JSON.parse(localStorage.getItem("appData"));
var lis = document.querySelectorAll("li");
var deleteButton;
var updateButton;
var username;
var glistitems=[];


function logout(){
	glistitems=[];
	checkForLogin("login");
}


function checkForLogin(user){
	glistitems=[];
	document.getElementById("glistul").innerHTML = "";
	 username = localStorage.getItem("checkinuser");
	if(username === user){
		document.getElementById("userintro").innerText=`Welcome ${user}`;
		
		createUserListElements();
		document.getElementById("glist").style.display = "block";
		document.getElementById("usercheckin").style.display = "none";
	}else{
		document.getElementById("glist").style.display = "none";
		document.getElementById("usercheckin").style.display = "block";
	}
}

function addUser(){
	var username=document.getElementById('username').value;
	localStorage.setItem("checkinuser", username);
	checkForLogin(username);
}

function inputLength() {
    return input.value.length;
}

function createDeleteButton(parent) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("\u2716"));
    button.className = "delete";
    parent.appendChild(button);
}


function createUpdateButton(parent) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("\u270E"));
    button.className = "update";
    parent.appendChild(button);
}



function addGListToUser(item){
	glistitems.push(item);
	localStorage.setItem(username+"glist", JSON.stringify({"items":glistitems}));
	
}

function remove(item){
	const index = glistitems.indexOf(item);

		if (index > -1) {
			glistitems.splice(index, 1);
			}
			
	localStorage.setItem(username+"glist", JSON.stringify({"items":glistitems}));
}

function update(item,itemnew){
	const index = glistitems.indexOf(item);
	glistitems[index]=itemnew;
	localStorage.setItem(username+"glist", JSON.stringify({"items":glistitems}));
}

function createListElement() {
	addGListToUser(input.value);
    var li = document.createElement("li");
    var span = document.createElement("span");
    li.appendChild(span);
    span.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);

    createDeleteButton(li);
    deleteButton = document.querySelectorAll(".delete")

    updateDeleteButtons()
	
    createUpdateButton(li);
    updateButton = document.querySelectorAll(".update")

    updateUpdateButtons()

    input.value = "";
}

function createUserListElements() {
	glistitems=[];
	let data=JSON.parse(localStorage.getItem(username+"glist"));
	if(data == null){
		glistitems=[];
	}else{
	glistitems=data['items'];
	if(glistitems==null){
		glistitems=[];
	}
	}
	
	glistitems.forEach(function(item){
    var li = document.createElement("li");
    var span = document.createElement("span");
    li.appendChild(span);
    span.appendChild(document.createTextNode(item));
    ul.appendChild(li);

    createDeleteButton(li);
    deleteButton = document.querySelectorAll(".delete")

    updateDeleteButtons()
	
    createUpdateButton(li);
    updateButton = document.querySelectorAll(".update")

    updateUpdateButtons()


    input.value = "";
	}
	);
}


function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

function updateDeleteButtons() {
    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", function() {
            this.parentNode.remove()
			remove(this.parentNode.querySelector('span').innerText);
        })
    }
}

function updateUpdateButtons() {
    for (var i = 0; i < updateButton.length; i++) {
        updateButton[i].addEventListener("click", function() {
			updateItemModal(this.parentNode)
        })
    }
}

var pnodetemp;
var tempitem;

function updateItemModal(pnode){
pnodetemp=pnode;
document.getElementById('updateinput').value=pnode.querySelector('span').innerText;
tempitem=pnode.querySelector('span').innerText;
modal.style.display = "block";


}

button.addEventListener("click", addListAfterClick);
login_button.addEventListener("click", addUser);
logout_button.addEventListener("click", logout);

input.addEventListener("keypress", addListAfterKeypress);
for (var i = 0; i < lis.length; i++) {
    

    createDeleteButton(lis[i])
	createUpdateButton(lis[i])
}
deleteButton = document.querySelectorAll(".delete")
updateDeleteButtons()

updateButton = document.querySelectorAll(".update")

updateUpdateButtons()



var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];
var tickupdate = document.getElementsByClassName("tick")[0];



span.onclick = function() {
  modal.style.display = "none";
}

tickupdate.onclick = function() {
	var newval=document.getElementById('updateinput').value;
	pnodetemp.querySelector('span').innerHTML=newval
  modal.style.display = "none";
  update(tempitem,newval);
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onload =checkForLogin("login")