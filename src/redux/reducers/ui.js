import defaultState from 'redux/defaultState';

export default (state = defaultState.ui, action) => {
  if (action.type === 'UI_LOADDING') {
    // 异步开始
    return {
      ...state,
      loadding: action.payload
    };
  }

  return state;
};
