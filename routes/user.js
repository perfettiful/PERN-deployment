const express = require('express');
const db = require('../db');

// Create new application router
const app = express();

app.delete('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Execute SQL statment
    const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

    res.status(200).send(rows[0]);
  } catch(err) {
    console.log("ERROR", err);
    next(err);
  }
});

app.get('/', async (req, res, next) => {
  try {
    // Execute SQL statment
    const { rows } = await db.query('SELECT * FROM users');

    res.status(200).send(rows);
  } catch(err) {
    next(err);
  }
});

app.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Execute SQL statment
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  
    res.status(200).send(rows[0]);
  } catch(err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const { email, firstName, lastName, phone, age } = req.body;

    // Generate SQL statement
    const statement = `INSERT INTO users ("email", "firstName", "lastName", "phone", "age")
                       VALUES ($1, $2, $3, $4, $5)
                       RETURNING *;`

    // Execute SQL statment
    const { rows } = await db.query(statement, [ email, firstName, lastName, phone, age ]);

    res.status(200).send(rows[0]);
  } catch(err) {
    next(err);
  }
});

app.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, firstName, lastName, phone, age } = req.body;

    // Generate SQL statement
    const statement = `UPDATE users
                       SET "email" = $1, "firstName" = $2, "lastName" = $3, "phone" = $4, "age" = $5
                       WHERE "id" = $6
                       RETURNING *;`

    // Execute SQL statment
    const { rows } = await db.query(statement, [ email, firstName, lastName, phone, age, userId ]);

    res.status(200).send(rows[0]);
  } catch(err) {
    next(err);
  }
});

// Export router to be mounted by parent application
module.exports = app;