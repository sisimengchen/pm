// import ViewMeta from '../units/meta/view.html'
// import ViewOgp from '../units/ogp/view.html'
import ViewImage from '../../units/image/view.html';
import ViewButton from '../../units/button/view.html';
import ViewTitle from '../../units/title/view.html';
import ViewTextBody from '../../units/textbody/view.html';
import ViewAudio from '../../units/audio/view.html';
// import ViewVideo from '../../units/video/view.html'
// import ViewCode from '../../units/code/view.html'
// import ViewSwiper from '../../units/swiper/view.html'
import ViewLine from '../../units/line/view.html';
import ViewImageGird from '../../units/imagegird/view.html';
import ViewBottomFloat from '../../units/bottomfloat/view.html';
// import ViewDataSystem from '../../units/datasystem/view.html';
import ViewNets from '../../units/nets/view.html';
import ViewCarousel from '../../units/carousel/view.html';
import ViewRules from '../../units/rules/view.html';
import ViewQrcode from '../../units/qrcode/view.html';

export default {
  META: {
    view: '', // 视图文件
    js: '', // 所需要依赖的js文件
    css: '' // 所需要依赖的css文件
  },
  BUTTON: {
    view: ViewButton,
    js: '',
    css: ''
  },
  TITLE: {
    view: ViewTitle,
    js: '',
    css: ''
  },
  IMAGE: {
    view: ViewImage,
    js: '',
    css: ''
  },
  TEXTBODY: {
    view: ViewTextBody,
    js: '',
    css: ''
  },
  AUDIO: {
    view: ViewAudio,
    js: '',
    css: ''
  },
  LINE: {
    view: ViewLine,
    js: '',
    css: ''
  },
  BOTTOMFLOAT: {
    view: ViewBottomFloat,
    js: '',
    css: ''
  },
  DATASYSTEM: {
    view: '',
    js: '/public/js/la.js#pagemaker',
    css: ''
  },
  CAROUSEL: {
    view: ViewCarousel,
    js: '/public/js/swiper-3.4.2.min.js#pagemaker',
    css: '/public/css/swiper.css#pagemaker'
  },
  IMAGEGIRD: {
    view: ViewImageGird,
    js: '',
    css: ''
  },
  RULES: {
    view: ViewRules,
    js: '',
    css: ''
  },
  QRCODE: {
    view: ViewQrcode,
    js: '/public/js/qrcode.min.js#pagemaker',
    css: ''
  },
  NETS: {
    view: ViewNets,
    js: 'https://analytics.163.com/ntes.js#pagemaker',
    css: ''
  },
  CODE: {
    view: '',
    js: '',
    css: ''
  }
};
