import immutable from 'immutable';
const unitsConfig = immutable.fromJS({
  META: {
    type: 'META',
    name: 'META信息配置',
    title: '',
    keywords: '',
    desc: '',
    bgColor: '#fff'
  },
  OGP: {
    type: 'OGP',
    name: 'OGP信息配置',
    unique: true,
    contents: []
  },
  TITLE: {
    type: 'TITLE',
    name: '标题',
    text: '',
    url: '',
    color: '#000',
    fontSize: 'middle',
    textAlign: 'center',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]
  },
  IMAGE: {
    type: 'IMAGE',
    name: '图片',
    address: '',
    url: '',
    desctxt: '',
    bgColor: 'transparent',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]
  },
  IMAGEGIRD: {
    type: 'IMAGEGIRD',
    name: '图宫格',
    girdStyle: 'horizontal2',
    contents: [
      // address: '',
      // title: '',
      // link: '',
      // colorStyle: ''
    ]
  },
  BUTTON: {
    type: 'BUTTON',
    name: '按钮',
    address: '',
    url: '',
    txt: '',
    margin: [0, 0, 0, 0],
    textColor: '#ffffff',
    bgColor: '#d91d37',
    appOrder: '',
    bigRadius: false,
    style: 'default',
    fontSize: 12,
    height: 50,
    imgHeight: 50
  },
  TEXTBODY: {
    type: 'TEXTBODY',
    name: '正文',
    text: '',
    textColor: '#333',
    bgColor: '#ffffff',
    fontSize: 'middle',
    textAlign: 'center',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    changeLine: true,
    retract: false,
    bigLH: false,
    bigPD: false,
    noUL: true,
    borderRadius: false
  },
  AUDIO: {
    type: 'AUDIO',
    name: '音频',
    address: '',
    showType: '',
    title: '',
    style: '',
    playSetting: '',
    margin: [0, 0, 0, 0]
  },
  VIDEO: {
    type: 'VIDEO',
    name: '视频',
    address: '',
    showType: '',
    title: '',
    style: '',
    playSetting: '',
    margin: [0, 0, 0, 0]
  },
  LINE: {
    type: 'LINE',
    name: '分割线',
    lineType: 'solid',
    color: '#cec1b1',
    margin: [0, 0, 0, 0]
  },
  BOTTOMFLOAT: {
    type: 'BOTTOMFLOAT',
    name: '底部浮层',
    address: '',
    url: '',
    appOrder: ''
  },
  RULES: {
    type: 'RULES',
    name: '规则',
    title: '',
    address: '',
    contents: [
      // '规则文案'
    ],
    textColor: '#fff',
    fontSize: 'small',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    openWay: 'manual',
    unique: true
  },
  CAROUSEL: {
    type: 'CAROUSEL',
    name: '轮播图',
    autoplay: 3,
    effect: 'slide',
    contents: [
      // { address: '', url: '' }
    ]
  },
  DATASYSTEM: {
    type: 'DATASYSTEM',
    name: '数据系统',
    unique: true
  },
  NETS: {
    type: 'NETS',
    name: '章鱼统计',
    unique: true
  },
  CODE: {
    type: 'CODE',
    name: 'JSCSS',
    js: '',
    css: ''
  },
  QRCODE: {
    type: 'QRCODE',
    name: '二维码',
    url: '',
    bgColor: 'transparent',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]
  },
  SWIPER: {
    type: 'SWIPER',
    name: '多屏',
    list: [
      {
        bgColor: 'pink',
        contains: [
          {
            type: 'TITLE',
            name: '标题',
            text: 'page1',
            url: '',
            color: '#000',
            fontSize: 'middle',
            textAlign: 'center',
            padding: [0, 0, 0, 0],
            margin: [0, 0, 0, 0]
          }
        ]
      },
      {
        bgColor: 'hotpink',
        contains: [
          {
            type: 'TEXTBODY',
            name: '正文',
            text: 'page2',
            textColor: '#eee',
            bgColor: '#fff',
            fontSize: 'small',
            textAlign: 'center',
            padding: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            changeLine: 'checked',
            retract: 'checked',
            bigLH: 'checked',
            bigPD: '',
            noUL: '',
            borderRadius: ''
          }
        ]
      }
    ]
  }
});

const initialState = immutable.fromJS([
  {
    uid: +new Date(),
    type: 'META',
    name: 'META信息配置',
    title: '',
    keywords: '',
    desc: '',
    bgColor: '#fff'
  }
]);

function reducer(state = initialState, action) {
  let newState;
  let localData;
  // 初始化从localstorage取数据
  if (state === initialState) {
    localData = localStorage.getItem('config');
    !!localData && (state = immutable.fromJS(JSON.parse(localData)));
  }
  switch (action.type) {
    case 'AddUnit': {
      const unit = unitsConfig.get(action.name).set('uid', +new Date());
      if (unit.get('unique')) {
        const hasunit = state.some((item) => {
          if (item.get('type') === unit.get('type')) {
            return true;
          }
        });
        if (!hasunit) {
          newState = state.push(unit);
        } else {
          newState = state;
        }
      } else {
        newState = state.push(unit);
      }
      break;
    }
    case 'EditUnit': {
      newState = state.setIn([action.id, action.prop], action.value);
      // console.table(newState.toJS());
      break;
    }
    case 'RemoveUnit': {
      newState = state.splice(action.id, 1);
      // console.table(newState.toJS());
      break;
    }
    case 'CopyUnit': {
      newState = state.push(state.get(action.id).set('uid', +new Date()));
      // console.table(newState.toJS());
      break;
    }
    case 'MoveUnit': {
      const { fid, tid } = action;
      const fitem = state.get(fid);
      const titem = state.get(tid);
      if (fitem && titem && fid !== tid) {
        newState = state.splice(fid, 1); // 删除from元素
        // 如果from大于to 则插入到to + 1 位置  如果from小于to 则插入到to位置
        newState = newState.splice(tid, 0, fitem);
      } else {
        newState = state;
      }
      // console.table(newState.toJS());
      break;
    }
    case 'Insert': {
      // console.log(action.data)
      newState = immutable.fromJS(action.data);
      // console.table(newState.toJS());
      break;
    }
    case 'Clear': {
      newState = initialState;
      // console.table(newState.toJS());
      break;
    }
    default:
      newState = state;
  }
  // 更新localstorage，便于恢复现场
  localStorage.setItem('config', JSON.stringify(newState.toJS()));
  return newState;
}

export default reducer;
