const express = require("express");
const app = express();
let morgan = require("morgan");

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// home page
app.get("/", (request, response) => {
  response.send(
    "<div><h1>Hello World</h1><p>Welcome to my learning page</p></div>"
  );
});

const getNumPeople = () => persons.length;
const generateId = () => Math.floor(Math.random() * 1000000);

// get info summary page
app.get("/info", (request, response) => {
  const numPeople = getNumPeople();
  response.send(
    `<p>Phonebook has info for ${numPeople} people</p><p>${new Date()}</p>`
  ); //starting point tomorrow
});

// get persons data
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// display single object
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete an object
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  console.log(persons);
  response.status(204).end();
});

// add a new object
app.post("/api/persons", (request, response) => {
  const body = request.body;
  // handle if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  // handle if name exists
  if (persons.find((person) => person.name == body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  console.log(newPerson);
  persons = persons.concat(newPerson);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
console.log(`server up and running on port ${PORT}`);
