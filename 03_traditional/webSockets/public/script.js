const ws = new WebSocket("ws://localhost:3000");

document.getElementById("sendButton").addEventListener("click", () => {
    sendMessage();
});

document.getElementById("message").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

ws.onmessage = (event) => {
  const li = document.createElement("li")
  event.data.text().then((text) => {
    li.textContent = text;
  });
  document.getElementById("messages").appendChild(li);
};

function sendMessage() {
  const msg = document.getElementById("message").value;
  ws.send(msg);
  document.getElementById("message").value = "";
}
