const { Client } = require('pg'); // imports the pg module

const username = 'postgres';
const password = 'password';
const port = 6543;

// supply the db name and location of the database
const client = new Client(`postgres://${username}:${password}@localhost:${port}/juicebox-dev`);

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `
  );

  return rows;
}

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// and export them
module.exports = {
  client,
  getAllUsers,
  createUser,
};
