import { getToken } from 'utils/token';

export default {
  token: getToken(),
  appInitComplete: false // 当前应用是否已经初始化完成
};
