const socket = new WebSocket('ws://localhost:8080');

let room = 0;
let myName = '';
let currentScreen = "loginScreen";

document.getElementById("chatScreen").style.display = "none";

function changeScreen() {
    let loginScreen = document.getElementById("loginScreen");
    let chatScreen = document.getElementById("chatScreen");
    if (currentScreen === "loginScreen") {
        loginScreen.style.display = "none";
        chatScreen.style.display = "block";
        currentScreen = "chatScreen";
    }
    else {
        loginScreen.style.display = "block";
        chatScreen.style.display = "none";
        currentScreen = "loginScreen";
        let obj = {
            type: "exit",
            code: room,
        };
        socket.send(JSON.stringify(obj));
        let chat = document.getElementById("chat");
        chat.innerHTML = "";
    }
}

function login() {
    let code = document.getElementById("roomCode");
    let name = document.getElementById("username");
    let obj = {
        type: "code",
        code: code.value,
        name: name.value
    };
    socket.send(JSON.stringify(obj));
    room = code.value;
    myName = name.value;
    document.getElementById("currentRoom").innerHTML = `Current room: ${room}`;
    changeScreen();
}

function sendMessage() {
    let msg = document.getElementById("sendText");
    if (msg.value === "") return;
    socket.send(JSON.stringify({
        type: "text",
        value: msg.value,
        code: room,
        userName: myName
    }));
    msg.value = "";
}

socket.addEventListener("message", msg => {
    let content = JSON.parse(msg.data);
    console.log(content)
    if(content.type === "numPlayers"){
        let numOnline = document.getElementById("numOnline");
        numOnline.textContent = `Online: ${content.value}`
    }
    else if(content.type === "message"){
        let chat = document.getElementById("chat");
        let text = document.createElement("p");
        text.textContent = `${content.value}`;
        if (content.userName === myName) {
            text.classList.add("outgoing");
            chat.appendChild(text);
        }
        else {
            text.classList.add("incoming");
            userName = document.createElement("p");
            userName.textContent = `${content.userName}`;
            userName.classList.add("incomingName");
            chat.appendChild(userName);
            chat.appendChild(text);
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
});

document.getElementById("sendText")
    .addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});