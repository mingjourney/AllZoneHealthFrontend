export const handleApiResponse = (response) => {
  const { code, data, message } = response.data;
  if (code === '20000') {
    return {
      success: true,
      data,
    };
  }

  return {
    success: false,
    message: message || '操作失败',
  };
};