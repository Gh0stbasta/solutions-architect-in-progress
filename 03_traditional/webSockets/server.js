const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// alle verbundenen clients speichern
wss.on("connection", (ws) => {
  console.log("Neuer Client verbunden");

  ws.on("message", (message) => {
    console.log(`Nachricht erhalten: ${message}`);
    // Nachricht an alle Clients raushauen:
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("Verbindung geschlossen"));
});

app.use(express.static("public"));

server.listen(3000, () => console.log("Server läuft auf 3000"));
