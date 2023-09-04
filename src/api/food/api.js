import axios from "axios";

export const fetchAllFoodCategory = async () => {
    const queryUrl = `/service-cook/cookbook/cookType`;
    try {
      const response = await axios.get(queryUrl);
      return response;
    } catch (error) {
      console.error('失败', error);
      throw error;
    }
  };
  