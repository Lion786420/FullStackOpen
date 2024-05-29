import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      <h2>Login to application</h2>
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const info = { username, password };
    const loggedIn = await loginService.loginUser(info);
    blogService.setToken(loggedIn.token);
    window.localStorage.setItem("user", JSON.stringify(loggedIn));
    setUser(loggedIn);
    setPassword("");
    setUsername("");
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  if (user === null) {
    return login();
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
