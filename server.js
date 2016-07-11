const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

app.locals.pizzas = {};

app.set('view engine', 'jade');
app.use(express.static('static'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pizza Express';

app.get('/', (request, response) => {
  response.render('index');
});

app.post('/pizzas', (request, response) => {
  if (!request.body.pizza) { return response.sendStatus(400); }

  var id = generateId();

  app.locals.pizzas[id] = request.body;

  // response.sendStatus(201);

  response.redirect('/pizzas/' + id);
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];

  response.render('pizza', { pizza: pizza });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (request, response) => {
//   response.send(app.locals.title);
// });
//
// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname, '/static/index.html'));
// });

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
