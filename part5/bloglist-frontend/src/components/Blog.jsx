import { useState } from "react";

const Blog = ({ blog, likeHandler, user, deleteHandler }) => {
  const [show, setShow] = useState(false);

  const updateLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    likeHandler(newBlog, blog.id);
  };

  const deleteBlog = () => {
    deleteHandler(blog.id, blog.title);
  };

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
          <button onClick={updateLikes}>Like</button>
        </div>
        <div>{blog.author}</div>
        {blog.user.username === user.username ? (
          <button onClick={deleteBlog} style={{ backgroundColor: "blue" }}>
            Remove
          </button>
        ) : null}
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
