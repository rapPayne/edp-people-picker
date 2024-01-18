// The web server
import express from 'express';
import fs from 'fs';

const app = express();

let db = JSON.parse(fs.readFileSync('db.json'));
const people = db["people"];

//Serve all the people at GET /people
app.get("/api/people", (req, res) => {
  res.send(people);
});

app.use(express.static("public"));

//TODO: Add a callback as the 2nd argument.
const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));
