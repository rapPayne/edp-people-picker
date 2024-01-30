// The web server
import express from 'express';
import { MongoClient } from 'mongodb';
// import fs from 'fs';

const app = express();

app.use(express.json());

// let db = JSON.parse(fs.readFileSync('db.json'));
// const people = db["people"];

app.all("*", (req, res, next) => {
  console.log(req.url);
  next();
});

//Serve all the people at GET /people
app.get("/api/people", async (req, res) => {
  // res.send(people);
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('edp');
    const collection = db.collection('people');
    const people = await collection.find().toArray();
    client.close();
    res.json(people);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/people/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('edp');
    const collection = db.collection('people');
    const person = await collection.findOne({'_id': +id});
    client.close();
    if(person) {
      res.json(person);
    } else {
      res.status(404).json({message: 'Person not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.post("/api/people", async (req, res) => {
  const data = req.body;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('edp');
    const collection = db.collection('people');
    const result = await collection.insertOne(data);
    client.close();
    res.status(201).json({"_id": result.insertedId});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});


app.use("", express.static("public/dist/index.html"));
app.use("/index.html", express.static("public/dist/index.html"));
app.use("/assets", express.static("public/dist/assets"));
app.use(express.static("public"));

const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));
