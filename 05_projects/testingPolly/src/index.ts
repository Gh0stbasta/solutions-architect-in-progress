import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly"; // Hier ist alles drin um auf AWS Polly zugreifen zu können
import * as fs from "fs"; // Das ist das Filesystem Modul um mit dem lokalen PC zu interagieren
import * as path from "path"; // Das ist ein Modul um einfacher mit Pfaden im lokalen System umzugehen
import * as readline from "readline"; //readline wird für Terminal Tools gebraucht um Ein- und Ausgabe abgreifen zu können
import { Readable } from "stream"; // stram ist ein Node modul und readable kann Datachunks verarbeiten, sodass man kleinere Teile von Daten senden kann statt komplette Teil
import * as dotenv from "dotenv"; //damit kann man die .env datei in process.env laden und hat sie quasi im Terminal

// .env-Datei laden
dotenv.config(); // das lädt die Daten aus der .env Datei, damit wir sie nicht im Code preisgeben müssen

// Eingabeaufforderung für Benutzertext
const rl = readline.createInterface({ // Hier machen wir das interface für readline, das benötigt wird, um im Terminal den User was zu fragen
  input: process.stdin, // hier bestimmen wir, dass der User im Terminal etwas eingeben darf
  output: process.stdout, // hier bestimmen wir, dass wir mit dem User über das Terminal kommunizieren 
});

const askText = (): Promise<string> => {  // Wir machen eine Funktion, () heißt sie kriegt keinen Paramter, Promise<string> heißt, dass die Funktion ein Promise zurückgeben wird, dass einen string enthält
  return new Promise((resolve) => { // hier machen wir das promis dann tatsächlich
    rl.question( // wir starten das readline interface um den user im terminal was zu fragen
      "🔤 Welchen Text möchtest du in Sprache umwandeln?\n> ", // das ist offensichtlich die frage
      (answer) => {  // im callback greifen wir die antwort vom user ab
        rl.close(); // dann schließen wir das interface 
        resolve(answer.trim()); // und senden "resolved" die antwort ohne extra leerzeichen oder dergleichen raus
      }
    );
  });
};

// Hauptfunktion zur Sprachsynthese
const synthesizeSpeech = async (text: string) => {
  const client = new PollyClient({ region: process.env.AWS_REGION });

  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: "mp3",
    VoiceId: "Hans", // z.B. auch: "Vicki" (neural), "Hans", "Joanna"
  });

  try {
    const response = await client.send(command);

    if (!response.AudioStream) {
      throw new Error("❌ Keine Audiodaten erhalten.");
    }

    // Cast zu Node.js-kompatiblem Stream
    const audioStream = response.AudioStream as Readable;

    const timestamp = Date.now();
    const outputPath = path.resolve(
      __dirname,
      "..",
      "output",
      `audio_${timestamp}.mp3`
    );
    const writeStream = fs.createWriteStream(outputPath);

    audioStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log(`✅ Audio erfolgreich gespeichert unter:\n${outputPath}`);
    });

    writeStream.on("error", (err) => {
      console.error("❌ Fehler beim Schreiben der Datei:", err);
    });
  } catch (err) {
    console.error("❌ Fehler bei Polly:", err);
  }
};

// Einstiegspunkt
(async () => {
  const text = await askText();

  if (!text) {
    console.log("❗ Kein Text eingegeben. Vorgang abgebrochen.");
    return;
  }

  console.log(`🎙️  Verarbeite Text: "${text}"`);
  await synthesizeSpeech(text);
})();
