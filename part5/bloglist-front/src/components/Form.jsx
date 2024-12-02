import { useState } from "react";

const Form = ({ blogHandler }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const createBlogHandler = (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    blogHandler(blog);
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={createBlogHandler}>
      <div>
        <h2>Add new Blog</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Create blog</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
