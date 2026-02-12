
const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

app.listen(3000);
