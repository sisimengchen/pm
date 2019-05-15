import Immutable from 'immutable';

import defaultState from 'redux/defaultState';
import initUnits from '../initstate/units';

const UnitFactory = Immutable.fromJS({
  META: {
    unitType: 'META',
    unitName: 'META信息配置',
    editable: false,
    unique: true,
    title: '',
    keywords: '',
    desc: '',
    backgroundColor: '#fff'
  },
  TITLE: {
    unitType: 'TITLE',
    unitName: '标题',
    editable: true,
    unique: false,
    text: '',
    href: '',
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0]
  },
  IMAGE: {
    unitType: 'IMAGE',
    unitName: '图片',
    editable: true,
    unique: false,
    href: '',
    src: '',
    backgroundColor: 'transparent',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: '100',
    height: '100',
    javascript: ''
  },
  JAVACRIPT: {
    unitType: 'JAVACRIPT',
    unitName: 'javascript',
    editable: true,
    unique: false,
    javascript: ''
  },
  CSS: {
    unitType: 'CSS',
    unitName: 'css',
    editable: true,
    unique: false,
    css: ''
  },
  HTML: {
    unitType: 'HTML',
    unitName: 'html',
    editable: true,
    unique: false,
    html: ''
  },
  MARKDOWN: {
    unitType: 'MARKDOWN',
    unitName: 'markdown',
    editable: true,
    unique: false,
    markdown: ''
  }
});

// const UnitFactory = Immutable.fromJS({
//   META: {
//     unitType: 'META',
//     editable: false,
//     unique: true,
//     unitName: 'META信息配置',
//     title: '',
//     keywords: '',
//     desc: '',
//     backgroundColor: '#fff'
//   },
//   OGP: {
//     unitType: 'OGP',
//     editable: false,
//     unique: true,
//     unitName: 'OGP信息配置',
//     contents: []
//   },
//   TITLE: {
//     unitType: 'TITLE',
//     editable: true,
//     unique: false,
//     unitName: '标题',
//     text: '',
//     url: '',
//     color: '#000',
//     fontSize: 12,
//     textAlign: 'center',
//     padding: [0, 0, 0, 0],
//     margin: [0, 0, 0, 0]
//   },
//   IMAGE: {
//     unitType: 'IMAGE',
//     editable: true,
//     unique: false,
//     unitName: '图片',
//     address: '',
//     url: '',
//     desctxt: '',
//     bgColor: 'transparent',
//     padding: [0, 0, 0, 0],
//     margin: [0, 0, 0, 0]
//   },
//   IMAGEGIRD: {
//     unitType: 'IMAGEGIRD',
//     editable: true,
//     unique: false,
//     unitName: '图宫格',
//     girdStyle: 'horizontal2',
//     contents: [
//       // address: '',
//       // title: '',
//       // link: '',
//       // colorStyle: ''
//     ]
//   },
//   BUTTON: {
//     unitType: 'BUTTON',
//     editable: true,
//     unique: false,
//     unitName: '按钮',
//     address: '',
//     url: '',
//     txt: '',
//     margin: [0, 0, 0, 0],
//     textColor: '#ffffff',
//     bgColor: '#d91d37',
//     appOrder: '',
//     bigRadius: false,
//     style: 'default',
//     fontSize: 12,
//     height: 50,
//     imgHeight: 50
//   },
//   TEXTBODY: {
//     unitType: 'TEXTBODY',
//     editable: true,
//     unique: false,
//     unitName: '正文',
//     text: '',
//     textColor: '#333',
//     bgColor: '#ffffff',
//     fontSize: 'middle',
//     textAlign: 'center',
//     padding: [0, 0, 0, 0],
//     margin: [0, 0, 0, 0],
//     changeLine: true,
//     retract: false,
//     bigLH: false,
//     bigPD: false,
//     noUL: true,
//     borderRadius: false
//   },
//   AUDIO: {
//     unitType: 'AUDIO',
//     editable: true,
//     unique: false,
//     unitName: '音频',
//     address: '',
//     showType: '',
//     title: '',
//     style: '',
//     playSetting: '',
//     margin: [0, 0, 0, 0]
//   },
//   VIDEO: {
//     unitType: 'VIDEO',
//     editable: true,
//     unique: false,
//     unitName: '视频',
//     address: '',
//     showType: '',
//     title: '',
//     style: '',
//     playSetting: '',
//     margin: [0, 0, 0, 0]
//   },
//   LINE: {
//     unitType: 'LINE',
//     editable: true,
//     unique: false,
//     unitName: '分割线',
//     lineType: 'solid',
//     color: '#cec1b1',
//     margin: [0, 0, 0, 0]
//   },
//   BOTTOMFLOAT: {
//     unitType: 'BOTTOMFLOAT',
//     editable: true,
//     unique: false,
//     unitName: '底部浮层',
//     address: '',
//     url: '',
//     appOrder: ''
//   },
//   RULES: {
//     unitType: 'RULES',
//     editable: true,
//     unique: true,
//     unitName: '规则',
//     title: '',
//     address: '',
//     contents: [
//       // '规则文案'
//     ],
//     textColor: '#fff',
//     fontSize: 'small',
//     padding: [0, 0, 0, 0],
//     margin: [0, 0, 0, 0],
//     openWay: 'manual'
//   },
//   CAROUSEL: {
//     unitType: 'CAROUSEL',
//     editable: true,
//     unique: false,
//     unitName: '轮播图',
//     autoplay: 3,
//     effect: 'slide',
//     contents: [
//       // { address: '', url: '' }
//     ]
//   },
//   DATASYSTEM: {
//     unitType: 'DATASYSTEM',
//     editable: false,
//     unique: true,
//     unitName: '数据系统'
//   },
//   NETS: {
//     unitType: 'NETS',
//     editable: false,
//     unique: true,
//     unitName: '章鱼统计'
//   },
//   CODE: {
//     unitType: 'CODE',
//     editable: true,
//     unique: false,
//     unitName: 'JSCSS',
//     js: '',
//     css: ''
//   },
//   QRCODE: {
//     unitType: 'QRCODE',
//     editable: true,
//     unique: false,
//     unitName: '二维码',
//     url: '',
//     bgColor: 'transparent',
//     padding: [0, 0, 0, 0],
//     margin: [0, 0, 0, 0]
//   },
//   SWIPER: {
//     unitType: 'SWIPER',
//     editable: true,
//     unique: false,
//     unitName: '多屏',
//     list: [
//       {
//         bgColor: 'pink',
//         contains: [
//           {
//             unitType: 'TITLE',
//             unitName: '标题',
//             text: 'page1',
//             url: '',
//             color: '#000',
//             fontSize: 'middle',
//             textAlign: 'center',
//             padding: [0, 0, 0, 0],
//             margin: [0, 0, 0, 0]
//           }
//         ]
//       },
//       {
//         bgColor: 'hotpink',
//         contains: [
//           {
//             unitType: 'TEXTBODY',
//             unitName: '正文',
//             text: 'page2',
//             textColor: '#eee',
//             bgColor: '#fff',
//             fontSize: 'small',
//             textAlign: 'center',
//             padding: [0, 0, 0, 0],
//             margin: [0, 0, 0, 0],
//             changeLine: 'checked',
//             retract: 'checked',
//             bigLH: 'checked',
//             bigPD: '',
//             noUL: '',
//             borderRadius: ''
//           }
//         ]
//       }
//     ]
//   }
// });

const dataHistory = {
  cache: [],
  max: 20,
  step: 0, // -1 ~ 19
  add: function(data) {
    if (this.step === this.cache.length - 1) {
      // step在默认位置
      if (this.cache.length < this.max) {
        // 总数符合要求，直接push
        this.cache.push(data);
      } else {
        this.cache = this.cache.slice(1); // 总数达到最大值，第一个出列，再push
        this.cache.push(data);
      }
    } else {
      // step被移动过  step = 3  cache.length = 20， 插入到第4个位置
      this.cache = this.cache.slice(0, this.step + 1); // 总数达到最大值，第一个出列，再push
      this.cache.push(data);
    }
    this.step = this.cache.length - 1;
  },
  clear: function() {
    // 清空
    this.cache = [];
    this.step = 0;
  },
  undo: function() {
    // 撤销 从大转到小 数据保留
    if (this.step === 0) {
      return;
    }
    this.step = this.step - 1;
    const data = this.cache[this.step];
    return data;
  },
  redo: function() {
    // 恢复 从小转到大 数据保留
    if (this.step === this.cache.length - 1) {
      return;
    }
    this.step = this.step + 1;
    const data = this.cache[this.step];
    return data;
  },
  size: function() {
    return this.cache.length;
  }
};

export default (state = defaultState.units, action) => {
  let newState;
  let localData;
  // 初始化从localstorage取数据
  if (state === initUnits) {
    localData = localStorage.getItem('UNITS_SESSION');
    if (localData) {
      state = Immutable.fromJS(JSON.parse(localData));
      if (dataHistory.size() === 0) {
        dataHistory.add(state);
      }
    }
  }
  switch (action.type) {
    case 'ADD_UNIT': {
      const unit = UnitFactory.get(action.unitType).set('unitId', +new Date());
      if (unit.get('unique')) {
        const isUnitExist = state.some(item => item.get('unitType') === unit.get('unitType'));
        if (isUnitExist) {
          newState = state;
        } else {
          newState = state.push(unit);
        }
      } else {
        newState = state.push(unit);
      }
      dataHistory.add(newState);
      break;
    }
    case 'REMOVE_UNIT': {
      newState = state.splice(action.unitIndex, 1);
      dataHistory.add(newState);
      break;
    }
    case 'COPY_UNIT': {
      newState = state.push(state.get(action.unitIndex).set('unitId', +new Date()));
      dataHistory.add(newState);
      break;
    }
    case 'UPDATE_UNIT': {
      if (action.index > -1) {
        newState = state.setIn([action.unitIndex, action.propName, action.index], action.propValue);
      } else {
        newState = state.setIn([action.unitIndex, action.propName], action.propValue);
      }
      !Immutable.is(state, newState) && dataHistory.add(newState);
      break;
    }
    case 'MOVE_UNIT': {
      const { fromIndex, toIndex } = action;
      const fromUnit = state.get(fromIndex);
      const toUnit = state.get(toIndex);
      if (fromUnit && toUnit && fromIndex !== toIndex) {
        newState = state.splice(fromIndex, 1); // 删除from元素
        // 如果from大于to 则插入到to + 1 位置  如果from小于to 则插入到to位置
        newState = newState.splice(toIndex, 0, fromUnit);
      } else {
        newState = state;
      }
      !Immutable.is(state, newState) && dataHistory.add(newState);
      break;
    }
    case 'CLEAR': {
      newState = initUnits;
      dataHistory.add(newState);
      break;
    }
    case 'IMPORT': {
      newState = Immutable.fromJS(action.units);
      !Immutable.is(state, newState) && dataHistory.add(newState);
      break;
    }
    case 'UNDO': {
      newState = dataHistory.undo() || state;
      break;
    }
    case 'REDO': {
      newState = dataHistory.redo() || state;
      break;
    }
    case 'COLLAPSE': {
      newState = state.map(item => item.set('collapse', 1));
      !Immutable.is(state, newState) && dataHistory.add(newState);
      break;
    }
    case 'UNCOLLAPSE': {
      newState = state.map(item => item.set('collapse', -1));
      !Immutable.is(state, newState) && dataHistory.add(newState);
      break;
    }
    default:
      newState = state;
  }
  const newStateJS = newState.toJS();
  localStorage.setItem('UNITS_SESSION', JSON.stringify(newStateJS));
  console.table(newStateJS);
  console.log('dataHistory.length', action, dataHistory);
  return newState;
};
