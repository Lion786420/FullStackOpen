import { useState } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const nameArray = persons.map((person) => person.name);

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameArray.includes(newName)) {
      alert(`The name "${newName}" is already in the phonebook. Cannot add`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          phone: newPhone,
          id: persons.length + 1,
        })
      );
      setNewName("");
      setNewPhone("");
    }
  };

  const personToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={setFilter} />
      <h3>Add new contact</h3>
      <Form
        submitHandler={submitHandler}
        newName={newName}
        newPhone={newPhone}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
      />
      <h2>Numbers</h2>
      <Phonebook personToShow={personToShow} />
    </div>
  );
};

export default App;
