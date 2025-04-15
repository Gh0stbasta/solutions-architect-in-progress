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
  return new Promise((resolve) => { // hier machen wir das promise dann tatsächlich
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
const synthesizeSpeech = async (text: string) => {  // synthesizeSpeech ist eine Funktino von Polly
  const client = new PollyClient({ region: process.env.AWS_REGION }); // Dazu brauchen wir einen neuen Polly Client in der Region unseres .env Filese

  const command = new SynthesizeSpeechCommand({  // Das Command sind die eingestellten "Optionen" von Polly
    Text: text, // das was polly bekommt
    OutputFormat: "mp3", // das was polly uns gibt
    VoiceId: "Hans", // z.B. auch: "Vicki" (neural), "Hans", "Joanna" --> so wie polly sich anhört
  });

  try { // Fehlerbehandlung
    const response = await client.send(command); // hier senden wir unsere Daten an Polly

    if (!response.AudioStream) { // wenn Polly uns nichts zurück gibt, müssen wir dem User eine Fehlermeldung geben
      throw new Error("❌ Keine Audiodaten erhalten.");
    }

    // Cast zu Node.js-kompatiblem Stream
    const audioStream = response.AudioStream as Readable; // wir nehmen hier ein Attribut des Antwortobjekts, bei dem wir wissen, dass es ein Stream ist. Jetzt sagen wir TS, dass es ein Stream wie der Readable Type von Node.js ist, damit wir sauber weiterarbeiten können.

    const timestamp = Date.now();  // Da gibts nen Zeitstempel
    const outputPath = path.resolve( // resolve erzeugt einen absoluten pfad und stückelt die parameter zusammen
      __dirname,
      "..",
      "output",
      `audio_${timestamp}.mp3`
    );
    const writeStream = fs.createWriteStream(outputPath); // createWriteStream ist eine Funktion aus Node.js die einen Stream auf die Festplatte schreiben kann. Eignet sich vor allem für große Datenmengen. Parameter ist der Ort, wo es hinsoll

    audioStream.pipe(writeStream); // Pipe ist wie in Linux und leitet die Daten einfach von einem Ort zum anderen

    writeStream.on("finish", () => { // wenn die Datei fertig geschrieben ist und die Meldung "finish" erhält, geben wir die Nachricht an den User weiter
      console.log(`✅ Audio erfolgreich gespeichert unter:\n${outputPath}`);
    });

    writeStream.on("error", (err) => { // Bei nem Error gibts dementsprechend ne Error nachricht
      console.error("❌ Fehler beim Schreiben der Datei:", err);
    });
  } catch (err) { // sollte der ganze try block fehlschlagen, gibts ne Polly fehlermeldung
    console.error("❌ Fehler bei Polly:", err);
  }
};

// Einstiegspunkt
(async () => {  // eine sofort aufgerufene asynchrone funktion ... Imediately Invoked function
  const text = await askText(); // weil wir die funktion async aufgerufen haben, können wir mit await jetzt abwarten bis der User seinen Text einegegeben hat.

  if (!text) { // wenn wir keinen Text bekommen haben aus dem Promise, dann brechen wirh ier ab
    console.log("❗ Kein Text eingegeben. Vorgang abgebrochen.");
    return;
  }

  console.log(`🎙️  Verarbeite Text: "${text}"`); // zwischenmeldung, dass wir die Daten verarbeiten
  await synthesizeSpeech(text); // jetzt machen wir die Polly Tour und lassen den Text verarbeiten.
})();
