exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World from Gh0stbasta" }),
  };
};
