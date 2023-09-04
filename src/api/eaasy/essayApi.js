import axios from 'axios';

export const fetchAllEssayCategory = async () => {
  const queryUrl = `/service-essay/essay/getEssayTypeAll`;
  try {
    const response = await axios.get(queryUrl);
    return response;
  } catch (error) {
    console.error('失败', error);
    throw error;
  }
};

export const fetchEssayByCategory = async (category) => {
  const queryUrl = `/service-essay/essay/getEssayByType?type=${category}`;
  try {
    const response = await axios.get(queryUrl);
    return response;
  } catch (error) {
    console.error('失败', error);
    throw error;
  }
};

export const fetchEssayDetailById = async (courseId) => {
  const queryUrl = `/service-essay/essay/getEssayDetailById?courseId=${courseId}`;
  try {
    const response = await axios.get(queryUrl);
    return response;
  } catch (error) {
    console.error('失败', error);
    throw error;
  }
};