import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const local = JSON.parse(localStorage.getItem("user"));
    if (local !== null) {
      setUser(local);
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const cred = { username, password };
    const token = await loginService.login(cred);
    console.log(token);
    setUser(token);
    localStorage.setItem("user", JSON.stringify(token));
    setPassword("");
    setUsername("");
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
  };

  const createBlogHandler = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    blogService.setToken(user.token);
    const newBlog = await blogService.createBlog(blog);
    setBlogs(blogs.concat(newBlog));
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
