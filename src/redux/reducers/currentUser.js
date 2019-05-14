import defaultState from 'redux/defaultState';

export default (state = defaultState.currentUser, action) => {
  if (action.type === 'APP_LOAD') {
    // app加载
    return {
      ...action.payload
    };
  }

  if (action.type === 'SIGNIN' || action.type === 'REGISTER') {
    // 登录注册
    return {
      ...action.payload
    };
  }

  if (action.type === 'SIGNOUT') {
    // 退出登录 清空token和currentUser
    return {};
  }

  return state;
};
