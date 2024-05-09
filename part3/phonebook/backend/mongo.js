const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = process.env;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneSchema = {
  name: String,
  number: String,
};

const Contact = mongoose.model("Contact", phoneSchema);

if (process.argv.length == 3) {
  Contact.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((contact) => {
      console.log(`${contact.name}  ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const contact = new Contact({ name: name, number: number });
  contact.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
