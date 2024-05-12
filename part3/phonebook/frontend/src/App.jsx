import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";
import phoneServices from "./services/phonebook";
import Success from "./Components/Success";
import Error from "./Components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccess] = useState(null);
  const [errorMessage, setError] = useState(null);

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
            setPersons(
              persons.map((person) => {
                if (person.name.toLowerCase() == newName.toLowerCase()) {
                  return newPerson;
                } else {
                  return person;
                }
              })
            );
            setSuccess("Number changed successfully");
            setNewName("");
            setNewPhone("");
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch((error) => {
            setError(
              `Information of "${newName}" already removed from the server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    } else {
      const newContact = {
        name: newName,
        number: newPhone,
      };
      phoneServices
        .addContact(newContact)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setSuccess("Contact added successfully");
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
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
      <Success message={successMessage} />
      <Error message={errorMessage} />
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
