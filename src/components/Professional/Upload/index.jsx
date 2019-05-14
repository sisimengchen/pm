import React, { Component } from 'react';
import { Upload, message } from 'antd';
import './index.less';

export default class ProfessionalUpload extends Component {
  static defaultProps = {
    list: [],
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // /contract/upload/uploadFileForContract
    limtit: 20, // 总文件数限制
    limtitHidden: true, // limtit == list.length 隐藏
    limtitByte: 1024 * 1024 * 10, // 单文件字节数
    onChange: function(file) {},
    spinTip: '正在上传，请稍后', // 普通上传等候文案
    imageOnly: true, // 是否只允许上传图片，ext等于[]时生效
    ext: [], // 文件扩展名白名单，长度大于0则imageOnly不生效
    uploadIcon: require('./uploadIcon.png'), // 普通上传Icon
    uploadPrompt: '上传电脑图片' // 普通上传文案
  };

  constructor(props) {
    super(props);
    this.state = {
      isUploading: false
    };
    this.uploadProps = {
      name: 'file',
      className: 'upload',
      action: props.action,
      beforeUpload: this.handleBeforeUpload,
      onChange: this.handleUploadChange,
      multiple: true,
      showUploadList: false,
      withCredentials: true
    };
    this.passCount = 0;
  }

  handleBeforeUpload = (file, fileList = []) => {
    if (this.passCount == 0) {
      // this.qrcodeUpateLock = true;
    }
    this.passCount++;
    const { ext = [], imageOnly, limtitByte, limtit, list } = this.props;
    let msg = '';
    let nReturn = true;
    if (ext.length) {
      const fileExt = file.name.replace(/^.+\./, '').toLowerCase();
      if (!ext.includes(fileExt)) {
        msg = '文件类型不符合要求';
        msg = `我们需要${ext.join(',')}类型的文件`;
        nReturn = false;
      }
    } else {
      if (imageOnly && file.type.indexOf('image') != 0) {
        msg = `${file.name}不是图片，只能上传图片哦`;
        nReturn = false;
      }
    }
    if (file.size > limtitByte) {
      msg = `${file.name}不能大于${limtitByte / 1024 / 1024}M哦，目前大小是：${(file.size / 1024 / 1024).toFixed(2)}M`;
      nReturn = false;
    }
    const currentCount = list.length;
    const waitCount = fileList.length;
    if (currentCount + this.passCount > limtit) {
      if (currentCount + this.passCount == limtit + 1) {
        msg = `最多只能上传${limtit}${imageOnly ? '张图片' : '个文件'}`;
      }
      nReturn = false;
    }
    if (this.passCount == waitCount) {
      this.passCount = 0;
      // this.qrcodeUpateLock = false;
    }
    msg && message.error(msg);
    return nReturn;
  };

  handleUploadChange = ({ file, fileList = [], event }) => {
    if (file.status === 'uploading') {
      this.setState({ isUploading: true });
      return;
    }
    // this.qrcodeUpateLock = false
    this.setState({ isUploading: false });
    if (file.status === 'done') {
      const { response } = file;
      if (response && response.url) {
        this.onChange({
          ...response,
          __raw: {
            ...file,
            ext: file.name ? file.name.replace(/^.+\./, '') : ''
          }
        });
      } else {
        fileList.pop();
        message.error(`${response.msg || response.message}`);
      }
    } else if (file.status === 'error') {
      message.error(`${file.name}上传失败`);
    }
  };

  onChange = (file) => {
    const { list, limtit } = this.props;
    const { url, __raw = {} } = file;
    if (!url) {
      return false;
    }
    if (list.length === limtit) {
      return false;
    }
    console.log('onChange', file);
    this.props.onChange(file);
    return true;
  };

  render() {
    const { isUploading } = this.state;
    const { list, limtit, limtitHidden } = this.props;
    return (
      <div
        className="components-professional-upload"
        style={limtitHidden && limtit > 0 && list.length >= limtit ? { display: 'none' } : {}}
      >
        <div className={`upload-spin${isUploading ? ' active' : ''}`}>
          <img className="icon" src={require('./loading.png')} />
          <p className="text">{this.props.spinTip}</p>
        </div>
        <Upload.Dragger {...this.uploadProps}>
          <div className="upload-inner">
            <img className="upload-icon" src={this.props.uploadIcon} />
            <p className="upload-text">{this.props.uploadPrompt}</p>
          </div>
        </Upload.Dragger>
      </div>
    );
  }
}
