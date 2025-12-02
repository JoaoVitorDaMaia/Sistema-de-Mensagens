// backend/server.js
const WebSocket = require("ws");

const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });

let messages = []; // histórico em RAM

function broadcast(payload) {
  const json = JSON.stringify(payload);
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) c.send(json);
  });
}

wss.on("connection", (ws) => {
  console.log("Nova conexão");

  // Envia histórico
  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", (raw) => {
    try {
      const data = JSON.parse(raw);

      // Se o cliente só enviou "role" no onopen, ignoramos aqui
      if (data.type === "role") {
        ws.role = data.role; // opcional guardar role no socket
        ws.user = data.user || null;
        return;
      }

      // Mensagem padrão esperada:
      // { type: "message", id, sender, nome, pedido?, texto, time }
      if (data.type === "message") {
        messages.push(data.payload);

        // mantém histórico em, no máximo, 1000 mensagens (opcional)
        if (messages.length > 1000) messages.shift();

        broadcast({ type: "newMessage", msg: data.payload });
      }
    } catch (err) {
      console.warn("Mensagem inválida:", err.message);
    }
  });

  ws.on("close", () => {
    console.log("Desconectou");
  });
});

console.log(`WebSocket rodando em ws://localhost:${PORT}`);
