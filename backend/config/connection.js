const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    sslmode: "verify-full",
  },
});

const initDB = async () => {
  try {
    await db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    cognito_sub TEXT UNIQUE NOT NULL,
    name TEXT,
    birthdate DATE,
    gender TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
`);

    console.log("Users table ready");
  } catch (err) {
    console.error("Failed to initialize DB:", err);
  }
};

initDB();

module.exports = db;
