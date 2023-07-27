/**
 * @swagger
 * /api/mysql-table:
 *   post:
 *     summary: get table csv
 *     description: post api to get table csv
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableName:
 *                 type: string
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *     responses:
 *       200:
 *         description: Post data received successfully
 *       400:
 *         description: Bad request - Invalid data format
 */
const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "my-secret-pw",
  database: "Test",
};
const connectionString = [
  "Server=localhost;Database=Test;Uid=root;Pwd=my-secret-pw;",
];

// CSV output file name
const csvFileName = "output.csv";

async function connectToDatabase() {
  try {
    // Database connection configuration
    const connection = await mysql.createConnection(dbConfig);

    console.log("Connected to the database.");
    return connection; // Return the connection for further use
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw err; // Rethrow the error for error handling in higher levels
  }
}

// Connect to the database

router.post("/mysql-table", async (req, res) => {
  // Access the data sent in the request body

  const postData = req.body;
  console.log("Received data:", postData);

  // Table name you want to download as CSV (assuming it's passed in the request body)
  const tableName = req.body.tableName;

  try {
    // Connect to the database using the connection obtained earlier
    const connection = await connectToDatabase();
    console.log("Connected to the database.");

    // Perform the SQL query using 'query' method
    const query = `SELECT * FROM ${tableName}`;
    const [rows, fields] = await connection.query(query);

    const csvWriter = createCsvWriter({
      path: csvFileName,
      header: postData.data,
    });
    console.log("Query results:", rows);

    csvWriter.writeRecords(rows);

    await connection.end();
  } catch (err) {
    console.error("Error executing query:", err.message);
    // Handle the error appropriately
  }

  res.status(200).json({ message: "Post data received successfully" });
});

module.exports = router;
