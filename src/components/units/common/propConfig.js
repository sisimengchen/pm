/**
 * 属性配置
 */

const PROP_CONFIG_MAP = {
  title: { label: '标题' },
  keywords: { label: '关键字' },
  desc: { label: '描述' },
  backgroundColor: { label: '背景色', display: 'color' },
  text: { label: '文案' },
  href: { label: '链接' },
  color: { label: '字色', display: 'color' },
  fontSize: { label: '字号' },
  textAlign: {
    label: '对齐方式',
    display: 'select',
    options: [
      { value: 'left', label: '左对齐' },
      { value: 'right', label: '右对齐' },
      { value: 'center', label: '居中对齐' },
      { value: 'justify', label: '两端对齐' },
      { value: 'inherit', label: '继承对齐' }
    ]
  },
  src: {
    label: '源URL',
    display: 'upload'
  },
  padding: { label: '内边距', display: 'inputgroup', labels: ['上内边距', '右内边距', '下内边距', '左内边距'] },
  margin: { label: '外边距', display: 'inputgroup', labels: ['上外边距', '右外边距', '下外边距', '左外边距'] }
};

export const propName2Config = (propName = '') => PROP_CONFIG_MAP[`${propName}`];
