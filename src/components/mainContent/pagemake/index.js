import template from './template-web.js';

import Configs from './config.js';
import ViewCore from './view.html';

template.defaults.escape = false;

template.defaults.imports.toJS = function(data) {
  return JSON.stringify(data);
};

template.defaults.imports.wrapP = function(s, style) {
  return s
    .split('\n')
    .map(x => `<p style = "${style}">${x}</p>`)
    .join('');
};

template.defaults.imports.getUrl = function(url) {
  return url;
};

const makeUnit = function(view, unit) {
  return template.render(view, unit);
};

const pageMake = function(units, isPreview) {
  if (!units || !units.length) {
    return '';
  }
  // 如果是预览使用相对路径展示，发布需要加上前缀补充成绝对路径

  const coreview = '';
  let temp = '';
  let meta;
  let inlineJs = '';
  let inlineCss = '';
  const jsList = [];
  const cssList = [];
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const { type } = unit;
    const config = Configs[type];
    if (type === 'META') {
      meta = unit;
    } else if (type === 'CODE') {
      unit.js && (inlineJs += `\r\n${unit.js}`);
      unit.css && (inlineCss += `\r\n${unit.css}`);
    } else if (config) {
      config.view && (temp += makeUnit(config.view, unit, isPreview));
      config.js && jsList.push(config.js);
      config.css && cssList.push(config.css);
    }
  }
  jsList.unshift('/public/js/lmui.js#pagemaker');
  jsList.unshift('/public/js/vendor.js#pagemaker');
  jsList.unshift('/public/js/URI.min.js#pagemaker');
  jsList.unshift('/public/js/appcore.js#pagemaker');
  jsList.unshift('/public/js/popup.js#pagemaker');
  jsList.unshift('/public/js/class.js#pagemaker');
  jsList.unshift('/public/js/utils.js#pagemaker');
  jsList.unshift('/public/js/jquery.js#pagemaker');
  jsList.push('/public/js/pm.js#pagemaker');
  cssList.unshift('/public/css/index.css#pagemaker');
  cssList.unshift('/public/css/vendor.css#pagemaker');
  cssList.unshift('/public/css/lmui.css#pagemaker');
  temp = makeUnit(ViewCore, {
    meta: meta,
    cssList: cssList,
    jsList: jsList,
    inlineCss: inlineCss,
    inlineJs: inlineJs,
    isPreview: isPreview,
    units: units
  }).replace('<pagemaker></pagemaker>', temp);
  !isPreview ? (temp = temp.replace(/[\r\n]/g, '')) : '';
  return temp;
};

export default pageMake;
