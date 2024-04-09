const pg = require("pg");
const bcrypt = require("bcrypt");

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/capstoneprojectdb"
);

async function register(firstName, lastName, email, username, password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users(first_name, last_name, email, username, password)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await client.query(sql, [
      firstName,
      lastName,
      email,
      username,
      hash,
    ]);
    const user = rows[0];
    return user;
  } catch (error) {
    throw new Error("Registration failed");
  }
}

async function login(email, password) {
  const sql = `
      SELECT * FROM users
      WHERE email = $1;
    `;
  const { rows } = await client.query(sql, [email]);
  const user = rows[0];
  if (!user) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }
  return user;
}

async function createTables() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    await client.query(sql);
  } catch (error) {
    throw error;
  }
}

export { client, createTables, register, login };
