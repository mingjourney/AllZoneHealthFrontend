import axios from 'axios';

export const sendCode = async (registerMethod, data) => {
  const url = `users/sendCheck`;
  try {
    const response = await axios.post(url, data,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};