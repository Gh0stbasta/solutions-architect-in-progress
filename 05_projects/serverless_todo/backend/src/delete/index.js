const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("🔧 delete handler invoked");
  console.log("📦 event:", JSON.stringify(event));

  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required 'id' path parameter" }),
    };
  }

  const params = {
    TableName: "Todos",
    Key: { id },
    ReturnValues: "ALL_OLD",
  };

  try {
    const result = await db.delete(params).promise();

    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }

    console.log("✅ Item deleted:", result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item deleted successfully", result }),
    };
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting item", error }),
    };
  }
};
