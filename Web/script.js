// Código simples para demonstrar envio local de mensagens.
const chatWindow = document.getElementById("chatWindow");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Função para criar um bloco de mensagem
function addMessage(text, who = "me") {
  // limpar nota inicial
  const firstNote = chatWindow.querySelector(".note");
  if (firstNote) firstNote.remove();

  const msg = document.createElement("div");
  msg.className = `message ${who === "me" ? "message-me" : "message-peer"}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const time = document.createElement("div");
  time.className = "msg-time";
  const now = new Date();
  time.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  msg.appendChild(bubble);
  msg.appendChild(time);
  chatWindow.appendChild(msg);

  // scroll automático para baixo
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "me");
  input.value = "";
  input.focus();
  simulateResponse(text); // apenas demonstra
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
