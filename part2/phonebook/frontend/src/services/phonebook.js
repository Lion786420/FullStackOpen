import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addContact = (contact) => {
  return axios.post(baseUrl, contact);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateContact = (id, newContact) => {
  return axios.put(`${baseUrl}/${id}`, newContact);
};

export default { getAll, addContact, deleteContact, updateContact };
