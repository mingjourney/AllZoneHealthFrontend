import axios from 'axios';
export const registerUser = async (userData) => {
  const queryUrl = `/service-user/users/signin`;
  try {
    const response = await axios.post(queryUrl, userData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

