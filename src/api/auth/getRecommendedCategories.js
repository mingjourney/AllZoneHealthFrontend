import axios from "axios";

export const getRecommendedCategories = async (token) => {
    const queryUrl = `/service-essay/essay/getEssayTypeByUser`;
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