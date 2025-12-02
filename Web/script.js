// web/script.js
const chatWindow = document.getElementById("chatWindow");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const overlay = document.getElementById("overlay");
const btnCliente = document.getElementById("btnCliente");
const btnAtendente = document.getElementById("btnAtendente");
const formCliente = document.getElementById("formCliente");
const formAtendente = document.getElementById("formAtendente");
const enterCliente = document.getElementById("enterCliente");
const enterAtendente = document.getElementById("enterAtendente");

const IP_WS = "localhost";
const WS_URL = `ws://${IP_WS}:3000`;

let ws = null;

let session = {
  role: null,
  nome: null,
  pedido: null,
};

// alternar login
btnCliente.onclick = () => {
  formCliente.classList.remove("hidden");
  formAtendente.classList.add("hidden");
};

btnAtendente.onclick = () => {
  formAtendente.classList.remove("hidden");
  formCliente.classList.add("hidden");
};

// login cliente
enterCliente.onclick = () => {
  const nome = document.getElementById("clienteNome").value.trim();
  const pedido = document.getElementById("clientePedido").value.trim();
  if (!nome || !pedido) return alert("Preencha nome e pedido.");

  session = { role: "client", nome, pedido };
  startSocket();

  overlay.style.display = "none";
  title.textContent = "Cliente";
  subtitle.textContent = `Conectado como ${nome}`;
};

// login atendente
enterAtendente.onclick = () => {
  const cpf = document.getElementById("atendenteCPF").value.trim();
  const senha = document.getElementById("atendenteSenha").value.trim();

  if (cpf !== "12345678900" || senha !== "1234") {
    return alert("Login inválido (teste: 12345678900 / 1234)");
  }

  session = { role: "attendant", nome: "Atendente" };
  startSocket();

  overlay.style.display = "none";
  title.textContent = "Atendente";
  subtitle.textContent = `Conectado como Atendente`;
};

// inicia websocket
function startSocket() {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "role",
        role: session.role,
        user: session.nome,
      })
    );
  };

  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);

    if (data.type === "history") {
      chatWindow.innerHTML = "";
      if (data.messages.length === 0) {
        chatWindow.innerHTML = `<div class="note">Sem mensagens</div>`;
      } else {
        data.messages.forEach(renderMessage);
      }
      chatWindow.scrollTop = chatWindow.scrollHeight;
      return;
    }

    if (data.type === "newMessage") {
      renderMessage(data.msg);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };
}

// renderização limpa SEM DUPLICAR
function renderMessage(msg) {
  const note = chatWindow.querySelector(".note");
  if (note) note.remove();

  const div = document.createElement("div");
  div.className = "message " + (msg.sender === "atendente" ? "me" : "peer");

  div.innerHTML = `
    <div><strong>${msg.nome}${
    msg.pedido ? " — Pedido: " + msg.pedido : ""
  }</strong></div>
    <div>${escapeHtml(msg.texto)}</div>
    <div class="msg-time">${msg.time}</div>
  `;

  chatWindow.appendChild(div);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (m) => {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m] || m
    );
  });
}

// enviar mensagem (SEM DUPLICAR)
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  ws.send(
    JSON.stringify({
      type: "message",
      payload: {
        id: Date.now(),
        sender: session.role === "attendant" ? "atendente" : session.nome,
        nome: session.nome,
        pedido: session.pedido,
        texto: text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    })
  );

  input.value = "";
}

sendBtn.onclick = sendMessage;

input.onkeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
};
