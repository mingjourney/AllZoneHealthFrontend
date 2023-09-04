import axios from 'axios';

export const submitWeight=  async(values, token) =>{
  const queryUrl = `/service-heathy/record/recordWeight`;

  const formData = new FormData();
  formData.append('weight', values.weight);
  try {
    const response = await axios.post(queryUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-auth-token': token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
