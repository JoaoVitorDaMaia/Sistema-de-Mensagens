const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

let messages = []; // RAM LOCAL

wss.on("connection", (ws) => {
  console.log("Cliente conectado!");

  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", (data) => {
    const msg = JSON.parse(data);

    messages.push(msg);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "newMessage", msg }));
      }
    });
  });
});

console.log("WebSocket rodando em ws://localhost:3000");
