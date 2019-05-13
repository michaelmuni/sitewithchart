const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const token = request.headers["x-access-token"];

  if (!token) {
    return response.json({ status: "error", message: "No token provided", data: null });
  }

  jwt.verify(token, request.app.get("secretKey"), (error, decoded) => {
    if (error) {
      return response.json({ status: "error", message: "Token authentication failed", data: null });
    }

    request.body.userId = decoded.id;

    next();
  });
};