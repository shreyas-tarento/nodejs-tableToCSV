/**
 * @swagger
 * /api/mssql-table:
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
const sql = require("mssql");

const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const connectionString = [
  "add your connection string here",
];

// CSV output file name
const csvFileName = "output.csv";

// Connect to the database

router.post("/mssql-table", async (req, res) => {
  // Access the data sent in the request body

  const postData = req.body;
  console.log("Received data:", postData);

  await sql.connect(connectionString[0]);
  console.log("Connected to the database.");

  // Table name you want to download as CSV (assuming it's passed in the request body)
  const tableName = req.body.tableName;

  // Query the database to get the table data
  const query = `SELECT * FROM ${tableName}`;
  const result = await sql.query(query);
  const csvWriter = createCsvWriter({
    path: csvFileName,
    header: postData.data,
  });

  csvWriter.writeRecords(result.recordset);
  sql.close();

  res.status(200).json({ message: "Post data received successfully" });
});

module.exports = router;
