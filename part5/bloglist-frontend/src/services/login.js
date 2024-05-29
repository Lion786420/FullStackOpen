import axios from "axios";
const baseUrl = "/api/login";

const loginUser = async (loginInfo) => {
  const userDetails = await axios.post(baseUrl, loginInfo);
  return userDetails.data;
};

export default { loginUser };
