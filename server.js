const express = require('express');
const app = express();
app.use(express.static('public'));
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(morgan('common'));
const mongoose = require('mongoose');
const { loggedItem } = require('./models');
const { DATABASE_URL, PORT} = require('./config')

mongoose.Promise = global.Promise;

//////////////////////////////////
let server;
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
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


app.post('/logged', jsonParser, (req, res) => {
  const requiredFields = ['name', 'calories', 'cholesterol', 'dietaryFiber', 'protein', 'saturatedFat', 'sodium', 'sugars', 'carbohydrates', 'totalFat'];
  console.log("posting");
  console.log(req.body);
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

 loggedItem
    .create({
      name: req.body.name,
      calories: req.body.calories,
      cholesterol: req.body.cholesterol,
      dietaryFiber: req.body.dietaryFiber,
      protein: req.body.protein,
      saturatedFat: req.body.saturatedFat,
      sodium: req.body.sodium,
      sugars: req.body.sugars,
      carbohydrates: req.body.carbohydrates,
      totalFat: req.body.totalFat
    })
    .then(loggedItem => res.status(201).json(loggedItem.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

});
/////////////////////////////////////////////

app.delete('/logged/:id', (req, res) => {
  loggedItem
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

/////////////////////////////////////////////////////////

app.get('/logged', (req, res) => {
  loggedItem
    .find()
    .then(logs => {
      res.json(logs.map(log => log.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

app.get('/logged/:id', (req, res) => {
  loggedItem
    .findById(req.params.id)
    .then(log => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});



/////////////////////////////////////////////

app.put('/logged/:id', jsonParser, (req, res) => {
  /*if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }*/

  const updated = {};
  const updateableFields =  ['name', 'calories', 'cholesterol', 'dietaryFiber', 'protein', 'saturatedFat', 'sodium', 'sugars', 'carbohydrates', 'totalFat'];;
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  loggedItem
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedLog => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


///////////////////////////////////////////////////////

app.delete('/:id', (req, res) => {
  loggedItem
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted item with id \`${req.params.id}\``);
      res.status(204).end();
    });
});


//////////////////////////////////////////////////////
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

