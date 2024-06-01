import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Success from "./components/Success";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const blogRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll();
      allBlogs.sort((a, b) => b.likes - a.likes);
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

  const createBlogHandler = async (newBlog) => {
    try {
      blogRef.current.toggleVisibility();
      const blogAdded = await blogService.createNew(newBlog);
      setSuccess(`User ${user.username} added new blog "${newBlog.title}"`);
      setBlogs(blogs.concat(blogAdded));
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setError("Error adding new blog");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const likeHandler = async (newBlog, blogId) => {
    const updatedBlog = await blogService.updateBlog(newBlog, blogId);
    const updatedBlogList = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    updatedBlogList.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogList);
  };

  const deleteHandler = async (blogId, blogTitle) => {
    if (window.confirm(`Do you want to delete the blog "${blogTitle}"`)) {
      const deletedBlog = await blogService.deleteBlog(blogId);
      const filteredBlog = blogs.filter((blog) => blog.id !== blogId);
      filteredBlog.sort((a, b) => b.likes - a.likes);
      setBlogs(filteredBlog);
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
      <Togglable buttonLabel="New Blog" ref={blogRef}>
        <CreateBlog apiSubmitHandler={createBlogHandler} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeHandler={likeHandler}
          user={user}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default App;
