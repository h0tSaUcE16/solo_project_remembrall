const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRouter = require('./routes/api')

const PORT = 3000;

// PARSE REQUEST BODY ON EVERY REQUEST
app.use(bodyParser.json());

// CONFIGURE FALLBACK URL
app.get('/*', ( req, res ) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});



// STARTING UP SERVER LISTENING ON PORT 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;