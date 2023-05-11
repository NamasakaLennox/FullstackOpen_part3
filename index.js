express = require("express");
const app = express();

app.use(express.json());

const persons = [
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

app.get("/", (request, response) => {
  response.send(
    "<div><h1>Hello World</h1><p>Welcome to my learning page</p></div>"
  );
});

app.get("/info", (request, response) => {
  response.send("Phonebook has info for ... people <br></br> blaaah"); //starting point tomorrow
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
console.log(`server up and running on port ${PORT}`);
