// const socket = io();
const socketio = io.connect();

let username;
let currentRoomId;

let roomsCreated = [];


Window.onload = onLoadFunction(0);

function onLoadFunction(usernameCheck) { //sets display

    username = "";
    
    document.getElementById("mainArea").style.display = 'none';
    document.getElementById("setUsername").style.display = 'block';
    document.getElementById("createRoom").style.display = 'block';
    document.getElementById("usernameButton").addEventListener("click", setUsername, false);

    if(usernameCheck == 1) {
        alert('Username Taken!');
    }

}

function setUsername() {

    usernameEntry = document.getElementById("username").value + "";

    usernameEntry = usernameEntry.trim();

    if (usernameEntry == "") {
        alert("Username Required");
    }
    else {
        username = usernameEntry;

        socketio.emit("logon", { username: username });
    }

    document.getElementById('username').value = '';

}

socketio.on('user_handshake', (data) => {

    document.getElementById("mainArea").style.display = 'flex';
    document.getElementById("setUsername").style.display = 'none';
    document.getElementById("chatBox").style.display = 'none';
    document.getElementById("availRooms").style.display = 'block';
    document.getElementById("currUsers").style.display = 'none';

    setCreateListener();
});

//Event listeners to create a room
function setCreateListener() {

    document.getElementById("createRoomButton").addEventListener('click', createRoom, false);

}

//event listeners to join a room
function setJoinListeners() {

    console.log("in setJoinListeners");
    let roomElements = document.getElementsByClassName('roomName');

    for (let i = 0; i < roomElements.length; i++) {

        roomElements[i].addEventListener('click', e => {

            let roomId = e.target.id;

            joinRoom(roomId);

        });
    }

}

function createRoom() {

    document.getElementById("roomMessages").innerHTML = "";

    let createRoomName = document.getElementById("roomNameText").value + "";
    let createRoomPassword = document.getElementById("roomPasswordText").value + "";

    socketio.emit("create_room_request", { createRoomName: createRoomName, createRoomPassword: createRoomPassword });

    document.getElementById("chatBox").style.display = 'block';
    document.getElementById("availRooms").style.display = 'none';
    document.getElementById("currUsers").style.display = 'block';
    document.getElementById("createRoom").style.display = 'none';

    document.getElementById("displayRoomName").innerHTML = '<b>Current Room: </b>' + createRoomName;

    document.getElementById("sendButton").addEventListener('click', sendRoomMessage, false);
    document.getElementById("backButton").addEventListener("click", showAvailRooms, false);

    document.getElementById("roomNameText").value = "";
    document.getElementById("roomPasswordText").value = "";



}

function joinRoom(roomId) {

    document.getElementById("displayRoomName").innerHTML = '<b>Current Room: </b>' + roomId;
    document.getElementById("roomMessages").innerHTML = "";
    socketio.emit("join_room_request", { roomId: roomId, username: username });

}

socketio.on('joinHandshake', (data) => { //join confirmed by server, display changed

    currentRoomId = data.roomId;

    document.getElementById("chatBox").style.display = 'block';
    document.getElementById("availRooms").style.display = 'none';
    document.getElementById("createRoom").style.display = 'none';
    document.getElementById("pwdCheck").style.display = 'none';
    document.getElementById("currUsers").style.display = 'block';

    document.getElementById("sendButton").addEventListener('click', sendRoomMessage, false);
    document.getElementById("backButton").addEventListener("click", showAvailRooms, false);

});

function showAvailRooms() {

    socketio.emit("exit_room_request", { roomId: currentRoomId, username: username });

    document.getElementById("chatBox").style.display = 'none';
    document.getElementById("availRooms").style.display = 'block';
    document.getElementById("currUsers").style.display = 'none';
    document.getElementById("createRoom").style.display = 'block';

    currentRoomId = -1;

}

function userListListeners(callback) {

    let count = 0;
    let kickoutClass = document.getElementsByClassName("kickout");

    for (let i = 0; i < kickoutClass.length; i++) {

        kickoutClass[i].addEventListener('click', e => {

            let roomId = currentRoomId;
            let elementId = (e.target.id).split('-');
            let kickUser = elementId[1];
            socketio.emit('kickUser', { kickUser: kickUser, roomId: roomId });

        });

        if (i == kickoutClass.length - 1) {
            count++;
        }
    }


    let banClass = document.getElementsByClassName("ban");

    for (let i = 0; i < banClass.length; i++) {

        banClass[i].addEventListener('click', e => {

            let roomId = currentRoomId;
            let elementId = (e.target.id).split('-');
            let banUser = elementId[1];
            socketio.emit('banUser', { banUser: banUser, roomId: roomId });

        });

        if (i == banClass.length - 1) {
            count++;
        }

    }


    let makeAdmin = document.getElementsByClassName("makeAdmin");

    for (let i = 0; i < makeAdmin.length; i++) {

        makeAdmin[i].addEventListener('click', e => {

            let roomId = currentRoomId;
            let elementId = (e.target.id).split('-');
            let makeAdminUser = elementId[1];
            socketio.emit("changeAdmin", { roomId: roomId, username: makeAdminUser });

            index = roomsCreated.indexOf(roomId);
            roomsCreated.splice(index, 1);
            roomAdminElements();
        });

        if (i == makeAdmin.length - 1) {
            count++;
        }

    }

    if (count == 3) {
        callback(); //calls roomAdminElements
    }


}

function roomAdminElements() { //sets display for kick, ban, makeadmin

    document.getElementById('banBackButton').addEventListener('click', roomAdminElements, false);

    document.getElementById('currUsers').style.display = "block";
    document.getElementById('currBanUsers').style.display = "none";

    let roomElements = document.getElementsByClassName('roomElements');
    let usernameElement = document.getElementsByClassName('userElement');

    if (roomsCreated.indexOf(currentRoomId) == -1) {

        for (let i = 0; i < roomElements.length; i++) {
            roomElements[i].style.display = 'none';
        }

        // for(let i = 0; i < usernameElement.length; i++){
        //     usernameElement[i].innerHTML += '<br><br>';
        // }
    }
    else {
        for (let i = 0; i < roomElements.length; i++) {
            roomElements[i].style.display = 'block';
        }
        document.getElementById('banUsersLink').style.display = "block";
        document.getElementById('banUsersLink').addEventListener('click', showBanUsers, false);
    }    
}

function showBanUsers() {
    document.getElementById('banUsersLink').removeEventListener('click', showBanUsers, false);

    document.getElementById('currUsers').style.display = "none";
    document.getElementById('currBanUsers').style.display = "block";

    document.getElementById('banBackButton').addEventListener('click', roomAdminElements, false);


    // list all banned users
    socketio.emit("bannedUsersList", { roomId: currentRoomId });

}


socketio.on('banUsersList', (data) => { //gets active ban users

    unBanUsersDiv = document.getElementById("banUsersList");

    unBanUsersDiv.innerHTML = "";
    console.log("data: " + data);

    if (data.length == 0) {

        unBanUsersDiv.innerHTML += "<div id='noBanUsersText'>No Users Banned Yet!! <br> Everyone has been a good child</div>";

    }
    else {
        unBanUsersDiv.innerHTML += "<div id='banUsersText'>Click on the user you'd like to un-ban</div>";

        for (let i = 0; i < data.length; i++) {
            let banName = data[i];

            let unBanElement = document.createElement('div');
            unBanElement.setAttribute('class', 'roomElements unban');
            unBanElement.setAttribute('id', 'banElem-' + banName);
            unBanElement.innerText = banName;
            unBanElement.style.display = "block";

            unBanUsersDiv.appendChild(unBanElement);
        }

        banUsersEventListeners();
    }
});

function banUsersEventListeners() {

    // console.log("in banusers");
    
    let unBanList = document.getElementsByClassName("unban");

    for(let i = 0; i < unBanList.length; i++){
        unBanList[i].addEventListener('click', e => {

            let userId = e.target.id;

            let name = userId.substr(8);
            console.log("unban: " + name);
            socketio.emit('unban', { name: name, roomId: currentRoomId });

        });
    }
}

// function unban(name){

// }

socketio.on('roomMessage', (data) => { //sends message to room

    if (data.sender == username) {
        return;
    }

    document.getElementById('roomMessages').innerHTML += '<div class="message">' + data.sender + ": " + data.message + '</div>';
    currentRoomId = data.roomId;
});

function sendRoomMessage() { //sends message to room

    let sendTo = document.getElementById('usersDropDown').value;
    let messageContent = document.getElementById("sendMessageText").value;

    if (sendTo === 'Everyone') {

        socketio.emit("clientRoomMessage", { roomId: currentRoomId, username: username, message: messageContent });

    }
    else {
        socketio.emit("privateMessage", { username: sendTo, message: messageContent });
        document.getElementById('roomMessages').innerHTML += '<div class="userMessage">[Private to ' + sendTo + ']: ' + messageContent + '</div>'

    }

    document.getElementById("sendMessageText").value = '';

}

socketio.on('messageAccepted', (data) => { //message sent

    document.getElementById('roomMessages').innerHTML += '<div class="userMessage">' + data.message + '</div>'

});

socketio.on('privateMessageRecieve', (data) => {

    document.getElementById('roomMessages').innerHTML += '<div class="message">' + data.sender + " [Private]: " + data.message + '</div>';

});

socketio.on('roomList', (data) => { //gets active roomList

    document.getElementById("roomNames").innerHTML = "";

    if (data.length == 0) {

        document.getElementById("roomNames").innerHTML += "<div>No Rooms Yet! Create One!</div>";

    }
    else {

        for (let i = 0; i < data.length; i++) {

            roomName = data[i];
            document.getElementById("roomNames").innerHTML += "<div class='roomName createRoomButton' id=" + roomName + ">" + roomName + "</div>";

        }

        setJoinListeners();
    }
});

socketio.on('userList', (data) => { //displays all room users

    roomUsersDiv = document.getElementById("roomUsers");

    roomUsersDiv.innerHTML = "";
    document.getElementById('usersDropDown').innerHTML = "<option value='Everyone's>Everyone</option>"

    userList = data;

    for (let i = 0; i < userList.length; i++) {

        thisUser = userList[i];

        if (thisUser == username) {
            continue;
        }

        let userElement = document.createElement('div');
        userElement.setAttribute('class', 'userElement');
        userElement.setAttribute('id', 'userElement-' + thisUser);

        roomUsersDiv.appendChild(userElement);

        let usernameElement = document.createElement('div');
        usernameElement.setAttribute('class', 'roomUsername');
        usernameElement.setAttribute('id', 'roomUsername-' + thisUser);
        usernameElement.innerText = thisUser;

        document.getElementById('userElement-' + thisUser).appendChild(usernameElement);

        //kick, ban, makeAdmin buttons

        let kickElement = document.createElement('div');
        kickElement.setAttribute('class', 'roomElements kickout');
        kickElement.setAttribute('id', 'kick-' + thisUser);
        kickElement.innerText = "Kick";

        document.getElementById('userElement-' + thisUser).appendChild(kickElement);

        let banElement = document.createElement('div');
        banElement.setAttribute('class', 'roomElements ban');
        banElement.setAttribute('id', 'ban-' + thisUser);
        banElement.innerText = "Ban";

        document.getElementById('userElement-' + thisUser).appendChild(banElement);

        let adminElement = document.createElement('div');
        adminElement.setAttribute('class', 'roomElements makeAdmin');
        adminElement.setAttribute('id', 'makeAdmin-' + thisUser);
        adminElement.innerText = "Make Admin";

        document.getElementById('userElement-' + thisUser).appendChild(adminElement);

        

        // <div class="break"></div>
        let breakElem = document.createElement('div');
        breakElem.setAttribute('class', 'break');


        // var br = document.createElement("br");
        document.getElementById('roomUsers').appendChild(breakElem);



        document.getElementById('usersDropDown').innerHTML += "<option value=" + thisUser + ">" + thisUser + "</option>"

    }

    userListListeners(roomAdminElements);
});

socketio.on('roomAdmin', data => {

    let roomId = data.roomId;
    roomsCreated.push(roomId);

});

socketio.on('kickOrder', data => {

    let roomId = data.roomId;
    let kickUser = data.kickUser;

    if (roomId == currentRoomId && kickUser == username) {
        alert('You have been kicked!');
        showAvailRooms();

    }

});

socketio.on('banOrder', data => {

    let roomId = data.roomId;
    let banUser = data.banUser;

    if (roomId == currentRoomId && banUser == username) {
        alert('You have been banned!');
        showAvailRooms();
    }
    else if (banUser == username) {
        alert('You have been banned!');

        document.getElementById("chatBox").style.display = 'none';
        document.getElementById("availRooms").style.display = 'block';
        document.getElementById("currUsers").style.display = 'none';
        document.getElementById("createRoom").style.display = 'block';

    }

});

socketio.on('adminSet', data => {

    let roomId = data.roomId;
    let newAdmin = data.username;

    if (newAdmin == username) {
        roomsCreated.push(roomId);
        roomAdminElements();
        alert("You are now the Admin of this room!");

    }

});

socketio.on('password_request', (data) => {

    let roomId = data.roomId;
    let pwd = '';

    document.getElementById("createRoom").style.display = 'none';
    document.getElementById('availRooms').style.display = 'none';
    document.getElementById("pwdCheck").style.display = 'block';

    alert('Enter Password');

    document.getElementById('pwdCheckSubmit').addEventListener('click', e => {

        pwd = document.getElementById('pwdCheckText').value;

        document.getElementById('pwdCheckText').value = '';

        socketio.emit('pwd_check', { pwd_attempt: pwd, username: username, roomId: roomId });

        return;

    }, { once: true });

    return;

});

socketio.on('pwd_false', (data) => {

    document.getElementById("chatBox").style.display = 'none';
    document.getElementById("availRooms").style.display = 'block';
    document.getElementById("currUsers").style.display = 'none';
    document.getElementById("createRoom").style.display = 'block';
    document.getElementById("pwdCheck").style.display = 'none';


    alert("incorrect password!");

});

socketio.on('username_taken', (data) => {


    onLoadFunction(1);

});