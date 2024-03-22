const pg = require("pg");
const bcrypt = require("bcrypt");
const { useResolvedPath } = require("react-router-dom");

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/capstoneprojectdb"
);

async function register(username, password) {
  const sql = `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    RETURNING *;
    `;
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await client.query(sql, [username, hash]);
  const user = rows[0];
  return users;
}

async function login(username, password) {
  const sql = `
    SELECT * FROM users
    WHERE usename = $1;
    `;
  const { rows } = await client.query(sql, [username]);
  const user = rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Password incorrect");
  }
  return user;
}

async function getAllUsers() {
  const sql = `
    SELECT`;
}

function createTables() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    
    `;
  return client.query(sql);
}

module.exports = {
  client,
  createTables,
  register,
  login,
  getAllUsers,
};
