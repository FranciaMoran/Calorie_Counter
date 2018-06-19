const express = require('express');
const app = express();
app.use(express.static('public'));

/////////////////////////////
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {MOCK_LOGGED_FOOD} = require('./mockdata');
const jsonParser = bodyParser.json();
app.use(morgan('common'));

//////////////////////////////////
/*
let server;
function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
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
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
*/
//////////////////////////////////////////////////////////
MOCK_LOGGED_FOOD.create('beans', 2,5,80,5,4,7,2,8,2,6);
MOCK_LOGGED_FOOD.create('tomatoes', 3,5,9,8,6,2,4,7,8,1);
MOCK_LOGGED_FOOD.create('peppers', 4,2,5,7,5,9,8,4,7,5);


app.get('/loggedfood', (req, res) => {
  res.json(MOCK_LOGGED_FOOD.get());
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 3000}`);
});
