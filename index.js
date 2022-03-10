const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://jhony75:240799jhony75@localhost:27017/admin';
const dbName = 'ocean_bancodados_10_03_2022';

async function main() {
  console.log('Iniciando conexão com o banco de dados');
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection('herois');
  console.log('Conexão realizada com sucesso');

  const app = express();

  app.use(express.json());

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  const herois = ['Mulher Maravilha', 'Capitã Marvel', 'Homem de Ferro'];

  // Get all
  app.get('/herois', async function (req, res) {
    const documentos = await collection.find().toArray();

    res.send(documentos);
  });

  // Get by Id
  app.get('/herois/:id', async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });

    res.send(item);
  });

  // Insert item
  app.post('/herois', async function (req, res) {
    const item = req.body;

    await collection.insertOne(item);

    res.send(item);
  });

  // Alter item
  app.put('/herois/:id', async function (req, res) {
    const id = req.params.id;
    const novoItem = req.body;

    await collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: novoItem,
      }
    );

    res.send(novoItem);
  });

  // Delete item
  app.delete('/herois/:id', async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne({ _id: ObjectId(id) });

    res.send('Item excluido com sucesso!');
  });

  app.listen(3000);
}

main();
