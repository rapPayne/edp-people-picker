// The web server
import express from 'express';
import fs from 'fs';

const app = express();

let db = JSON.parse(fs.readFileSync('db.json'));
const people = db["people"];

app.all("*", (req, res, next) => {
  console.log(req.url);
  next();
});

//Serve all the people at GET /people
app.get("/api/people", (re, res) => {
  res.send(people);
});

app.use(express.static("public"));

const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));
