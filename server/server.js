const bodyParser = require("body-parser");
const config = require("./config/application");
const database = require("./config/database");
const verifyToken = require("./services/auth");
const userRoutes = require("./routes/user.routes");
const revisionRoutes = require("./routes/revision.routes");
const server = require("express")();
const cors = require("cors");

// Setup JWT Key
server.set("secretKey", config.JWT_SECRET);

// Setup body parser
server.use(bodyParser.json());

// Setup CORS
server.use(
  cors({
    origin: "http://localhost:4200"
  })
);

// Default route
server.get("/", (request, response) => {
  response.json({ tutorial: "this is a test" });
});

// Server startup
server.listen(config.PORT, () => {
  console.log(`Server started on port: ${config.PORT}`);
});

// Database connection
database.connection.on("error", error => console.log(error));
database.connection.once("open", () => {
  server.use("/user", userRoutes);
  server.use("/revisions", verifyToken, revisionRoutes);
  server.get("/overview", verifyToken, (request, response) => {
    response.json({ status: "Success", message: "Route accessed with authorization", data: null });
  });
  console.log("Database connected");
});
