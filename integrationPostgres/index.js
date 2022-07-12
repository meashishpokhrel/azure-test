// Azure Function: Node.js code to create PostgreSQL data and return results as JSON

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

  const client = new pg.Client(config);

  client.connect((err) => {
    if (err) console.log(err);
    else {
      queryDatabase();
      console.log("connected !");
    }
  });
  console.log("client sfd");
  async function queryDatabase() {
    // const query = `
    //     DROP TABLE IF EXISTS tabletest;
    //     CREATE TABLE tabletest (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
    //     INSERT INTO tabletest (name, quantity) VALUES ('banana', 150);
    //     INSERT INTO tabletest (name, quantity) VALUES ('orange', 154);
    //     INSERT INTO tabletest (name, quantity) VALUES ('apple', 100);
    //     INSERT INTO tabletest (name, quantity) VALUES ('lemon', 120);
    // `;

    // client
    //   .query(query)
    //   .then(() => {
    //     console.log("Table created successfully!");
    //     client.end(console.log("Closed client connection"));
    //   })
    //   .catch((err) => console.log(err))
    //   .then(() => {
    //     console.log("Finished execution, exiting now");
    //     process.exit();
    //   });

    const query2 = "SELECT * FROM inventory;";
    const result = await client.query(query2);
    console.log(result);
    client
      .query(query2)
      .then((res) => {
        const rows = res.rows;
        console.log(rows);
        context.res = {
          body: {
            msg: "success",
            // data: rows,
          },
        };
        rows.map((row) => {
          console.log(`Read: ${JSON.stringify(row)}`);
        });

        process.exit();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("rows", rows);
};
