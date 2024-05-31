import { useState } from "react";

const CreateBlog = ({ apiSubmitHandler }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogSubmitHandler = (e) => {
    e.preventDefault();
    const newNote = { title, author, url };
    setTitle("");
    setAuthor("");
    setUrl("");
    apiSubmitHandler(newNote);
  };
  return (
    <form onSubmit={blogSubmitHandler}>
      <div>Create New Blog</div>
      <div>
        Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlog;
