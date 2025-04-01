const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid"); // Universell eindeutige ID
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Mini-Validierung
    if (!body.title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "title is required" }),
      };
    }

    const todo = {
      id: uuidv4(),
      title: body.title,
      done: false,
      createdAt: new Date().toISOString(),
    };

    await db
      .put({
        TableName: "Todos",
        Item: todo,
      })
      .promise();

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Für CORS
      },
      body: JSON.stringify(todo),
    };
  } catch (error) {
    console.error("Fehler beim Speichern von Todo:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
