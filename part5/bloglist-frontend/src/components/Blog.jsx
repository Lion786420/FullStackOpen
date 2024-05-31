import { useState } from "react";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <div className="eachBlog">
        <div>
          {blog.title}
          <button onClick={() => setShow(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>Like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    );
  }
  return (
    <div className="eachBlog">
      {blog.title} {blog.author}
      <button onClick={() => setShow(true)}>View</button>
    </div>
  );
};

export default Blog;
