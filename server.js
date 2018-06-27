const express = require('express');
const app = express();
app.use(express.static('public'));
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(morgan('common'));
const { loggedItem } = require('./models');
const { DATABASE_URL, PORT} = require('./config')

//////////////////////////////////
let server;
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      }).on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
      });
    });
  });
}

/////////////////////////////////////////
/*

app.post('/logged', (req, res) => {
  const requiredFields = ['Item', 'Calories'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
*/
/////////////////////////////////////////////

if (require.main === module) {1
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

