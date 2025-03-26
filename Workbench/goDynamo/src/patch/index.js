const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    console.log("🟡 update invoked");
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing 'id' in path" }),
      };
    }

    const body = JSON.parse(event.body);
    const { title, done } = body;

    if (typeof title !== "string" || typeof done !== "boolean") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request body" }),
      };
    }

    const params = {
      TableName: "Todos",
      Key: { id }, // Wenn du einen Sort Key hast: { id, createdAt }
      UpdateExpression: "set #title = :t, #done = :d",
      ExpressionAttributeNames: {
        "#title": "title",
        "#done": "done",
      },
      ExpressionAttributeValues: {
        ":t": title,
        ":d": done,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await db.update(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Todo updated",
        item: result.Attributes,
      }),
    };
  } catch (error) {
    console.error("❌ Fehler beim Aktualisieren:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};
