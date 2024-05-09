const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
const Contact = require("./models/phonebook");
app.use(express.static("dist"));
app.use(express.json());

morgan.token("postLog", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan("tiny"));

// persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response, next) => {
  Contact.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Contact.findById(id)
    .then((contact) => {
      response.json(contact);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const searchedId = request.params.id;
  console.log(searchedId);
  Contact.findByIdAndDelete(searchedId)
    .then((result) => {
      response.status(202).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (request, response, next) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

app.use(
  morgan(":method :postLog :status :res[content-length] - :response-time ms")
);

app.post("/api/persons", (request, response, next) => {
  const newPerson = request.body;
  const contact = new Contact({
    name: newPerson.name,
    number: newPerson.number,
  });
  contact
    .save()
    .then((result) => {
      console.log("Person added to phonebook");
      response.send(result);
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
