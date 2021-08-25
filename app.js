const express = require('express');
const routeLoader = require('./routes');
const swaggerLoader = require('./swagger');
const app = express();
const cors = require('cors');

const { PORT } = require('./config');

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Transforms raw string of req.body into JSON
app.use(express.json());

// Parses urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Init application loaders
routeLoader(app);
swaggerLoader(app);

// Error Handler Middleware
app.use((err, req, res, next) => {

  const { message, status } = err;

  res.status(status).send({ message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});