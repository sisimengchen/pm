import Store from '../store';
const { dispatch } = Store;
const actions = {
  addUnit: (name) => {
    dispatch({ type: 'AddUnit', name });
  },
  editUnit: (id, prop, value) => dispatch({ type: 'EditUnit', id, prop, value }),
  removeUnit: id => dispatch({ type: 'RemoveUnit', id }),
  copyUnit: id => dispatch({ type: 'CopyUnit', id }),
  moveUnit: (fid, tid) => dispatch({ type: 'MoveUnit', fid, tid }),
  clear: () => dispatch({ type: 'Clear' }),
  insert: data => dispatch({ type: 'Insert', data })
};
export default actions;
