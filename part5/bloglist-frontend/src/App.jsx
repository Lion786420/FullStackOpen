import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Success from "./components/Success";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };
    if (user !== null) {
      getBlogs();
    }
  }, [user]);

  useEffect(() => {
    const localUser = window.localStorage.getItem("user");
    if (localUser) {
      const localUserParsed = JSON.parse(localUser);
      blogService.setToken(localUserParsed.token);
      setUser(localUserParsed);
    }
  }, []);

  const login = () => (
    <form onSubmit={submitHandler}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );

  const addBlogForm = () => (
    <form onSubmit={createBlogHandler}>
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

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const info = { username, password };
      const loggedIn = await loginService.loginUser(info);
      blogService.setToken(loggedIn.token);
      window.localStorage.setItem("user", JSON.stringify(loggedIn));
      setUser(loggedIn);
      setError(null);
      setPassword("");
      setUsername("");
    } catch (error) {
      setError("Incorrect username or password");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const createBlogHandler = async (e) => {
    try {
      e.preventDefault();
      const newBlog = { title, author, url };
      const blogAdded = await blogService.createNew(newBlog);
      setSuccess(`User ${user.username} added new blog "${title}"`);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(blogAdded));
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      setError("Error adding new blog");
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Login to application</h2>
        <Error message={error} />
        <Success message={success} />
        {login()}
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <br />
      <div>
        {`${user.username} logged in`}
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <br />
      <Error message={error} />
      <Success message={success} />
      <br />
      {addBlogForm()}
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
