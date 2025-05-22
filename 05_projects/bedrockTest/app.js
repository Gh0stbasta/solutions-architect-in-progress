import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION;
const modelId = process.env.BEDROCK_MODEL_ID;

const client = new BedrockRuntimeClient({ region });

const input = {
  modelId,
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    inputText: "Was ist die Hauptstadt von Frankreich?",
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 1,
    },
  }),
};

const command = new InvokeModelCommand(input);

try {
  const response = await client.send(command);
  const json = JSON.parse(new TextDecoder().decode(response.body));
  console.log("Antwort von Titan Text Express:", json.results[0].outputText);
} catch (err) {
  console.error("Fehler beim Aufruf:", err);
}
