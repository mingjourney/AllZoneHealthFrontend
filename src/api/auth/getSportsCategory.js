import axios from "axios";

export const getRecentWeight = async (token) => {
    const queryUrl = `/service-heathy/record/getSportList`;
    try {
      const response = await axios.get(queryUrl, {
        headers: {
          'x-auth-token': token
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };