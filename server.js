const express = require("express");
const app = express();
const PORT = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Middleware to parse JSON data in the request body
app.use(express.json());

//get
app.get("/", (req, res) => {
  // Access the data sent in the request body
  console.log("Received data:", "get api");
  res.end("Hello, Node.js Server!");
});

const mssqlTable = require("./routes/mssqlTable");
const mysqlTable = require("./routes/mySqlTable");

app.use("/api", mssqlTable);
app.use("/api", mysqlTable);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
