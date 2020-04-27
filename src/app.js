const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./biz-layer/routes');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', api);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

module.exports = app;
