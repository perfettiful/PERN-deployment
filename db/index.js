"use strict";

const { Pool } = require('pg');
const { DB, STAGE } = require('../config');

// Determine deployment stage
const isProduction = STAGE === 'production';

// Generate development connection string
const connectionString = `postgresql://${DB.PGUSER}:${DB.PGPASSWORD}@${DB.PGHOST}:${DB.PGPORT}/${DB.PGDATABASE}`;

// Configure connection pool
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}