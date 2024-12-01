import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Form from "./components/Form";
import Success from "./components/Success";
import Error from "./components/Error";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    try {
      const token = await loginService.login(cred);
      if (token !== null) {
        setUser(token);
        localStorage.setItem("user", JSON.stringify(token));
        setPassword("");
        setUsername("");
        setSuccess(`Logged in with user ${token.name}`);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      }
    } catch (error) {
      setError("Username or password error");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
  };

  const blogHandler = async (blog) => {
    blogService.setToken(user.token);
    try {
      const newBlog = await blogService.createBlog(blog);
      setBlogs(blogs.concat(newBlog));
      setSuccess(`New blog added with title "${newBlog.title}"`);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError("Error adding new blog");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {success === "" ? "" : <Success message={success} />}
        {error === "" ? "" : <Error message={error} />}
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
      {success === "" ? "" : <Success message={success} />}
      {error === "" ? "" : <Error message={error} />}
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <Form blogHandler={blogHandler} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
