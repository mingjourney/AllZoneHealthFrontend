import axios from 'axios';

export const submitDailyData = async (dailyData,token) => {
  const queryUrl = `/service-heathy/record/recordDailyData`;
  try {
    const response = await axios.post(queryUrl, dailyData, {
        headers: {
            'x-auth-token': token
          }
    });
    return response;
  } catch (error) {
    throw error;
  }
};


