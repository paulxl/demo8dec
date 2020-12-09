console.log("inside demo8dec index.js");

const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

//server.listen(3000);
server.listen(process.env.PORT || 3000);
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//{id:001,
// name: "wild dog",
// attitude:"bad",
// score: 91,
// weekness: "stinky beer"
// region: "East"
// modeOfTravel: "run in circles"}
const myChars = [
  {
    id: "001",
    name: "Wild Dog",
    attitude: "bad",
    score: 20,
    weekness: "road kill",
    region: "south east",
    modeOfTravel: "walk",
  },
  {
    id: "002",
    name: "willy coyote",
    attitude: "mischief",
    score: 40,
    weekness: "road runners",
    region: "south west",
    modeOfTravel: "run",
  },
  {
    id: "003",
    name: "smelly skunk",
    attitude: "dont care",
    score: 10,
    weekness: "day light",
    region: "south west",
    modeOfTravel: "walk",
  },
  {
    id: "004",
    name: "road runner",
    attitude: "comical",
    score: 120,
    weekness: "tamalies",
    region: "south west",
    modeOfTravel: "run",
  },
  {
    id: "005",
    name: "fat bear",
    attitude: "comical",
    score: 50,
    weekness: "honey",
    region: "west",
    modeOfTravel: "walk",
  },
];

//route to return list of all myChars
server.get("/myChars", (req, res) => {
  res.send(myChars);
});
server.get("/myChars/name", (req, res) => {
  const names = req.params.name;
  const results = [];
  for (let index = 0; index < myChars.length; index++) {
    let nameTemp = myChars[index].name;
    results.push(nameTemp);
  }
  res.send(results);
});

server.post("/myChars", (req, res) => {
  myChars.push(req.body);
  res.send(myChars);
});

//route to return myChars by role
server.get("/myChars/attitude/:attitude", (req, res) => {
  const role = req.params.attitude;
  //const attitude = myChars.attitude;
  const results = [];
  for (let index = 0; index < myChars.length; index++) {
    const element = myChars[index].attitude;
    if (element === role) {
      results.push(myChars[index].name);
    }
  }
  res.send(results);
});

//route to return myChars by id
server.get("/myChars/:id", (req, res) => {
  const cId = req.params.id;
  let result = "";
  //const results = myChars.filter((myChars) => myChars.cId === cId);
  for (let index = 0; index < myChars.length; index++) {
    const element = myChars[index].id;
    if (element === cId) {
      result = myChars[index];
      //res.send(result);
    }
  }
  res.send(result);
});

//route to change myChars information by id
server.put("/myChars/:id", (req, res) => {
  const id = req.params.id;
  const character = req.body;
  let result = myChars.filter((char1) => char1.cId === id);
  if (character.name !== undefined) {
    result[0].name = character.name;
  }
  if (character.attitude !== undefined) {
    result[0].attitude = character.attitude;
  }
  if (character.score !== undefined) {
    result[0].score = character.score;
  }
  if (character.weekness !== undefined) {
    result[0].weekness = character.weekness;
  }
  if (character.region !== undefined) {
    result[0].region = character.region;
  }
  if (character.modeOfTravel !== undefined) {
    result[0].modeOfTravel = character.modeOfTravel;
  }
  res.send(result[0]);
});

//route to delete myChars by id
server.delete("/myChars/:id", (req, res) => {
  const id = req.params.id;
  let char1Idx = -1;
  myChars.map((char1, idx) => {
    if (char1.cId === id) {
      //if true, found emp to delete
      char1Idx = idx;
      return;
    }
  });
  if (char1Idx === -1) {
    return res.status(404).send("Character not found");
  }
  myChars.splice(char1Idx, 1);
  res.send({ success: "Success" });
});
