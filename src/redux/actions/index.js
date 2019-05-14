import store from '../store';
const { dispatch } = store;
const actions = {
  // 添加单元
  addUnit: unitType => dispatch({ type: 'ADD_UNIT', unitType }),
  // 删除单元
  removeUnit: unitIndex => dispatch({ type: 'REMOVE_UNIT', unitIndex }),
  // 更新单元
  updateUnit: (unitIndex, propName, propValue, index = -1) => dispatch({ type: 'UPDATE_UNIT', unitIndex, propName, propValue, index }),
  // 复制单元
  copyUnit: unitIndex => dispatch({ type: 'COPY_UNIT', unitIndex }),
  // 移动单元
  moveUnit: (fromIndex, toIndex) => dispatch({ type: 'MOVE_UNIT', fromIndex, toIndex }),
  // 清空
  clear: () => dispatch({ type: 'CLEAR' }),
  // 导入
  import: units => dispatch({ type: 'IMPORT', units }),
  // 展开
  collapse: () => dispatch({ type: 'COLLAPSE' }),
  // 关闭
  unCollapse: () => dispatch({ type: 'UNCOLLAPSE' }),
  // 撤销
  undo: () => dispatch({ type: 'UNDO' }),
  // 恢复
  redo: () => dispatch({ type: 'REDO' })
};
export default actions;
