import axios from 'axios'
export async function loginUser(loginMethod, values) {
  const queryUrl = `/service-user/users/login`;

  const formData = new FormData();
  formData.append('password', values.password);
  formData.append('login', loginMethod === 'mobile' ? values.mobile : values.email);
  formData.append('type', loginMethod === 'mobile' ? 1 : 2);

  try {
    const response = await axios.post(queryUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
