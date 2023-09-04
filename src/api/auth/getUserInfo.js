import axios from "axios";

export const getUserInfo = async (token) => {
    const queryUrl = `/service-user/users/info`;
    try {
      const response = await axios.get(queryUrl, {
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