const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl =
  process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});
console.log("connected to database");
app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
