const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    const result = await db.scan({ TableName: "Todos" }).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Für CORS
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Fehler beim Abrufen von Todos:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
