// Azure Function: Node.js code to read PostgreSQL data and return results as JSON
// Author: Dhyanendra Singh Rathore

// Import the pg (node-postgres) library
const pg = require("pg");

// Entry point of the function
module.exports = async function (context, req) {
  // Define variables to store connection details and credentials
  const config = {
    host: "dynamotest.postgres.database.azure.com",
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: "myadmin",
    password: "Billing$123#!",
    database: "postgres",
    port: 5432,
    ssl: { rejectUnauthorized: false },
  };

  // Create query to execute against the database
  const querySpec = {
    text: `
        DROP TABLE IF EXISTS tabletest;
        CREATE TABLE tabletest (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO tabletest (name, quantity) VALUES ('banana', 150);
        INSERT INTO tabletest (name, quantity) VALUES ('orange', 154);
        INSERT INTO tabletest (name, quantity) VALUES ('apple', 100);
        INSERT INTO tabletest (name, quantity) VALUES ('lemsson', 120);
    `,
  };

  try {
    // Create a pool of connections
    const pool = new pg.Pool(config);

    // Get a new client connection from the pool
    const client = await pool.connect();

    // Execute the query against the client
    const result = await client.query(querySpec);

    // Release the connection
    client.release();

    console.log(result);

    // Return the query resuls back to the caller as JSON
    context.res = {
      status: 200,
      isRaw: true,
      body: "Table Created Successfully ! ",
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    context.log(err.message);
  }
};
