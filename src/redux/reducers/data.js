import defaultState from 'redux/defaultState';

export default (state = defaultState.data, action) => {
  if (action.type === 'UPDATE_DATA') {
    return {
      ...state,
      ...action.payload
    };
  }

  if (action.type === 'REPLACE_DATA') {
    return {
      ...action.payload
    };
  }

  if (action.type === 'CLEAR_DATA') {
    return {};
  }

  return state;
};
