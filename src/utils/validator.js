export const validatePhone = (rule, value) => {
    if (!value) {
      return Promise.reject('请输入手机号');
    }
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return Promise.reject('请输入正确的手机号');
    }
    return Promise.resolve();
  };
  
export const validateEmail = async (_, value) => {
  const emailPrefixRegex = /^(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;
  if (value && emailPrefixRegex.test(value)) {
    return Promise.resolve(); // 验证通过
  } else {
    return Promise.reject('请输入正确的邮箱前缀'); // 验证失败，返回错误信息
  }
};
//用户信息检查
export const isUserInfoComplete = (userInfo) => {
  if (!userInfo) {
    return false;
  }

  return (
    userInfo.nickname &&
    userInfo.phone &&
    userInfo.email &&
    userInfo.weight &&
    userInfo.height &&
    userInfo.password &&
    userInfo.target
  );
};

export const getUserInfoAndCheckComplete = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return {
    userInfo,
    isCompleted: isUserInfoComplete(userInfo),
  };
};