import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const nameArray = persons.map((person) => person.name);

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameArray.includes(newName)) {
      alert(`The name "${newName}" is already in the phonebook. Cannot add`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newPhone,
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
