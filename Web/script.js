const chatWindow = document.getElementById("chatWindow");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const ws = new WebSocket("ws://localhost:3000");

// Renderizar mensagem
function renderMessage(msg) {
  const note = chatWindow.querySelector(".note");
  if (note) note.remove();

  const div = document.createElement("div");
  div.className = `message ${
    msg.sender === "client" ? "message-me" : "message-peer"
  }`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = msg.text;

  const time = document.createElement("div");
  time.className = "msg-time";
  time.textContent = msg.time;

  div.appendChild(bubble);
  div.appendChild(time);
  chatWindow.appendChild(div);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "history") {
    chatWindow.innerHTML = "";
    data.messages.forEach(renderMessage);
  }

  if (data.type === "newMessage") {
    renderMessage(data.msg);
  }
};

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const msg = {
    id: Date.now(),
    sender: "client",
    text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  ws.send(JSON.stringify(msg));
  input.value = "";
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
