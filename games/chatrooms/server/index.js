const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({PORT});

let rooms = {};
let roomMessages = {};
let roomNames = {};

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.on("message", msg => {
        let content = JSON.parse(msg);
        if (content.type === "code") {
            if (content.code in rooms) {
                rooms[content.code].push(ws);
                if (content.code in roomMessages) {
                    for (let text of roomMessages[content.code]) {
                        ws.send(JSON.stringify(text));
                    }
                }
                for (let client of rooms[content.code]) {
                    let obj = {
                        type: "numPlayers",
                        value: rooms[content.code].length
                    };
                    client.send(JSON.stringify(obj));
                }
            }
            else {
                let obj = {
                    type: "numPlayers",
                    value: 1
                };
                ws.send(JSON.stringify(obj));
                rooms[content.code] = [ws];
            }
        }
        else if (content.type === "text") {
            let code = content.code;
            let clients = rooms[code];
            let obj = {
                type: "message",
                userName: content.userName,
                value: content.value
            };
            for (let client of clients) {
                client.send(JSON.stringify(obj));
            }
            if (content.code in roomMessages) {
                roomMessages[content.code].push(obj);
            }
            else {
                roomMessages[content.code] = [obj];
            }
        }
        else if (content.type === "exit") {
            let ind = rooms[content.code].indexOf(ws);
            rooms[content.code].splice(ind, 1);
        }
    });

    ws.on("close", () => {
        for (let [room, clients] of Object.entries(rooms)) {
            let ind = clients.indexOf(ws);
            if (ind > -1) {
                clients.splice(ind, 1);
                for(let client of clients){
                    let obj = {
                        type: "numPlayers",
                        value: clients.length
                    };
                    client.send(JSON.stringify(obj))
                }
            }
        }
    });
});