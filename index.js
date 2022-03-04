const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

const herois = ['Mulher Maravilha', 'Capitã Marvel', 'Homem de Ferro'];

app.get('/herois', function (req, res) {
  res.send(herois.filter(Boolean));
});

app.get('/herois/:id', function (req, res) {
  const id = req.params.id - 1;
  const item = herois[id];

  res.send(item);
});

app.post('/herois', function (req, res) {
  const item = req.body;

  herois.push(item);

  res.send('Item adicionado com sucesso!');
});

app.put('/herois/:id', function (req, res) {
  const id = req.params.id - 1;
  const novoItem = req.body.nome;

  herois[id] = novoItem;

  res.send('Item atualizado com sucesso!');
});

app.delete('/herois/:id', function (req, res) {
  const id = req.params.id - 1;

  delete herois[id];

  res.send('Item excluido com sucesso!');
});

app.listen(3000);
