import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const updateBlog = async (newBlog, blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${blogId}`, newBlog, config);
  return request.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request.data;
};

export default { setToken, getAll, createNew, updateBlog, deleteBlog };
