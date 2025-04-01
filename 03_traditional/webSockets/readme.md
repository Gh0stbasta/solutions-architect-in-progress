# WebSocket Echtzeit-Chat für 2 Clients

## ✨ Projektbeschreibung
Dieses Projekt implementiert einen **einfachen WebSocket-Chat**, bei dem **zwei oder mehr Clients in Echtzeit miteinander kommunizieren** können.
- **Backend:** Node.js mit `ws` (WebSocket-Server)
- **Frontend:** HTML + JavaScript (WebSocket-Client)
- **Live-Updates:** Nachrichten erscheinen sofort bei allen verbundenen Clients

---

## 🔍 Voraussetzungen

### **Node.js installieren (falls nicht bereits installiert)**  
[Download Node.js](https://nodejs.org/)

### **Projekt initialisieren & Abhängigkeiten installieren**
```sh
npm init -y
npm install ws express
```

---

## 📚 Projektstruktur
```
/websocket-chat
 ├── /public
 │   ├── index.html  # WebSocket-Client (Frontend)
 ├── server.js       # WebSocket-Server (Backend)
 ├── package.json    # Projektinformationen
```

---

## 🎯 20 Schritte zur Umsetzung

### **1️⃣ Projekt-Setup**
1. Erstelle einen neuen Ordner `websocket-chat` und öffne ihn in deiner IDE.
2. Initialisiere ein neues Projekt mit `npm init -y`.
3. Installiere `ws` und `express` mit `npm install ws express`.

### **2️⃣ WebSocket-Server erstellen**
4. Erstelle eine Datei `server.js`.
5. Importiere `express`, `http` und `ws`.
6. Richte `express` ein, um statische Dateien aus dem `public`-Ordner bereitzustellen.
7. Erstelle einen WebSocket-Server mit `ws.Server()`.
8. Fange Verbindungen mit `wss.on("connection", callback)` ab.
9. Implementiere `ws.on("message", callback)`, um Nachrichten zu empfangen.
10. Implementiere eine Broadcast-Funktion, um Nachrichten an alle Clients zu senden.
11. Logge eingehende Nachrichten zur Debugging-Zwecken.
12. Erstelle eine `ws.on("close", callback)`-Funktion, um Verbindungsabbrüche zu handhaben.

### **3️⃣ WebSocket-Client erstellen**
13. Erstelle einen Ordner `public` und darin eine Datei `index.html`.
14. Implementiere ein einfaches HTML-Layout mit Eingabefeld und Button.
15. Nutze JavaScript, um eine WebSocket-Verbindung zum Server aufzubauen.
16. Implementiere `ws.onmessage = callback`, um empfangene Nachrichten in der UI anzuzeigen.
17. Implementiere eine Funktion `sendMessage()`, um Nachrichten an den Server zu senden.
18. Füge eine Liste `<ul>` hinzu, um Chat-Nachrichten anzuzeigen.
19. Stelle sicher, dass die Nachricht nach dem Senden aus dem Eingabefeld gelöscht wird.

### **4️⃣ Server starten & testen**
20. **Starte den Server:**  
```sh
node server.js
```

**Testen:**  
- Öffne `http://localhost:3000` in **zwei verschiedenen Browserfenstern**.
- Sende eine Nachricht von einem Fenster → Sie erscheint sofort in beiden Fenstern! 🎉

---

## 🔧 Erweiterungsideen
✔ **Benutzernamen hinzufügen** (Jeder Client kann sich mit einem Namen anmelden).  
✔ **Private Nachrichten ermöglichen** (Senden an einen bestimmten Client statt an alle).  
✔ **Chatverlauf speichern** (Nachrichten persistent speichern, z. B. in einer Datenbank).  
✔ **Verbesserte UI** (CSS-Design für eine schönere Chat-Oberfläche).  

---

## 🔎 Fazit
✅ **WebSocket-Server mit Node.js & `ws` erstellt**  
✅ **Client-Server-Kommunikation in Echtzeit umgesetzt**  
✅ **Mehrere Clients können miteinander chatten**  

➡ **Viel Spaß beim Bauen & Experimentieren! 🚀**
