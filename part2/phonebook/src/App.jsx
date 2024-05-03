import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";
import phoneServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are u sure u want to delete the contact")) {
      phoneServices.deleteContact(id).then((response) => {
        console.log(response);
      });
      setPersons(persons.filter((person) => person.id != id));
    }
  };

  const nameArray = persons.map((person) => person.name.toLowerCase());

  const submitHandler = (e) => {
    e.preventDefault();
    if (nameArray.includes(newName.toLowerCase())) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook. Do you want to replace the previous number?`
        )
      ) {
        const redundantPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        console.log(redundantPerson);
        const newPerson = {
          id: redundantPerson.id,
          name: newName,
          number: newPhone,
        };

        phoneServices
          .updateContact(redundantPerson.id, newPerson)
          .then((response) => {
            console.log(response);
          });
        setPersons(
          persons.map((person) => {
            if (person.name.toLowerCase() == newName.toLowerCase()) {
              return newPerson;
            } else {
              return person;
            }
          })
        );
        setNewName("");
        setNewPhone("");
      }
    } else {
      const newContact = {
        name: newName,
        number: newPhone,
      };
      phoneServices.addContact(newContact).then((response) => {
        setPersons(persons.concat(response.data));
      });

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
      {personToShow.map((person) => (
        <Phonebook
          person={person}
          deleteHandler={() => deleteHandler(person.id)}
          key={person.id}
        />
      ))}
    </div>
  );
};

export default App;
