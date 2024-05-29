const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, item) => sum + item.likes, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  let mostLikes = 0;
  let favorite = {};
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes) {
      mostLikes = blogs[i].likes;
      favorite = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favorite;
};

const mostBlogs = (blogs) => {
  const authors = [];
  let authorBlogs = [];
  let mostBlogsAuthor = {};
  let highest = 0;
  blogs.forEach((blog) => {
    if (authors.includes(blog.author)) {
      authorBlogs = authorBlogs.map((detail) => {
        if (detail.author == blog.author) {
          return { author: blog.author, blogs: detail.blogs + 1 };
        } else {
          return detail;
        }
      });
    } else {
      authors.push(blog.author);
      authorBlogs.push({ author: blog.author, blogs: 1 });
    }
  });
  authorBlogs.forEach((author) => {
    if (author.blogs > highest) {
      mostBlogsAuthor = author;
      highest = author.blogs;
    }
  });
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const authors = [];
  let authorBlogs = [];
  let mostLikesAuthor = {};
  let highest = 0;
  blogs.forEach((blog) => {
    if (authors.includes(blog.author)) {
      authorBlogs = authorBlogs.map((detail) => {
        if (detail.author == blog.author) {
          return { author: blog.author, likes: detail.likes + blog.likes };
        } else {
          return detail;
        }
      });
    } else {
      authors.push(blog.author);
      authorBlogs.push({ author: blog.author, likes: blog.likes });
    }
  });
  authorBlogs.forEach((author) => {
    if (author.likes > highest) {
      mostLikesAuthor = author;
      highest = author.likes;
    }
  });
  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
