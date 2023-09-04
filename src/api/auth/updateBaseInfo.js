import axios from 'axios';
export const updateBaseInfo = async (userData,token) => {
  const queryUrl = `users/userBaseInfo`;
  try {
    const response = await axios.post(queryUrl, userData, {
        headers: {
            // 'Authorization': `Bearer ${token}`
            'x-auth-token': token
          }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

