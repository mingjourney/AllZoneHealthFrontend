import axios from 'axios';

export const submitTargetEntering = async (data, token) => {
  const queryUrl = `/service-heathy/record/recordTarget`; // 请替换为您的API端点
  try {
    const response = await axios.post(queryUrl, data, {
      headers: {
        'x-auth-token': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
