const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

const herois = ['Mulher Maravilha', 'Capitã Marvel', 'Homem de Ferro'];

app.get('/herois', function (req, res) {
  res.send(herois);
});

app.get('/herois/:id', function (req, res) {
  const id = req.params.id - 1;
  const item = herois[id];
  res.send(item);
});
app.listen(3000);
