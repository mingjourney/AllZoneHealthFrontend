
import axios from 'axios';


export const fetchDayPlan = async (level,token) => {
  const queryUrl = `/service-heathy/plan/getDatePlanToday?level=${level}`;
  try {
    const response = await axios.get(queryUrl,{
      headers: {
        'x-auth-token': token
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch day plan:', error);
    throw error;
  }
};
