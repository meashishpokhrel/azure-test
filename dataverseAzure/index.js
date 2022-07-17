// Azure Function: Node.js code to read PostgreSQL data and return results as JSON

// Import the pg (node-postgres) library
const pg = require("pg");

// Entry point of the function

console.log("hello");
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

const client = new pg.Client(config);
console;
client.connect((err) => {
  if (err) console.log(err);
  else {
    queryDatabase();
    console.log("connected !");
  }
});
console.log("client sfd");
function queryDatabase() {
  const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
        INSERT INTO inventory (name, quantity) VALUES ('lemon', 1220);
    `;

  client
    .query(query)
    .then(() => {
      console.log("Table created successfully!");
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .then(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}
