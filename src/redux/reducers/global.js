import defaultState from 'redux/defaultState';

export default (state = defaultState.global, action) => {
  if (action.type === 'APP_LOAD') {
    // app启动
    return {
      ...state,
      appInitComplete: true
    };
  }

  if (action.type === 'SIGNOUT') {
    // 退出登录 清空token和currentUser
    return {
      ...state,
      token: null
    };
  }

  return state;
};
