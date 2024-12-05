import { useState } from "react";

const Blog = ({ blog, increaseLikes, deleteHandler }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeHandler = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    delete newBlog.id;
    increaseLikes(newBlog, blog.id);
  };

  if (!show) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShow(true)}>View</button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setShow(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={likeHandler}>Like</button>
        </div>
        <div>{blog.author}</div>
        <div>
          <button onClick={() => deleteHandler(blog)}>Remove</button>
        </div>
      </div>
    );
  }
};

export default Blog;
