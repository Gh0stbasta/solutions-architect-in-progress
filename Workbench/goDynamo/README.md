# ☁️ Serverless Todo API – AWS Lambda + DynamoDB

Dieses Projekt ist eine einfache, aber voll funktionsfähige **serverlose Todo-API**, bestehend aus:

- ✅ AWS Lambda (Node.js)
- ✅ DynamoDB
- ✅ API Gateway
- ✅ Curl/Postman-Testbarkeit

---

## 🚀 Features

- `POST /todo` → Erstellt ein neues Todo  
- `GET /todos` → Listet alle Todos  
- (Optional: `DELETE`, `UPDATE` … ausbaubar)
- DynamoDB speichert `id`, `title`, `done`, `createdAt`



## 🔍 Beispielantwort

```json
{
  "id": "f97b9cf6-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "title": "Dynamo lernen",
  "done": false,
  "createdAt": "2025-03-25T19:00:00.000Z"
}
```

---

## 🧠 Gelernt & umgesetzt

- AWS Lambda mit Node.js deployen
- `aws-sdk` + `uuid` korrekt einbinden
- DynamoDB als Serverless-Speicher nutzen
- JSON-Handling und Error-Logging
- Debugging mit CloudWatch Logs
- ZIP-Fails erkennen und beseitigen 😄


## 👤 Autor

Projekt im Rahmen meines SkillPilot-Systems  
Powered by Kaffee, Logs und Debugging ✨  
**GitHub: [@Gh0stbasta](https://github.com/Gh0stbasta)**

---

> „Ich schreibe keine Server – ich werfe Funktionen in die Cloud.“ ☁️
