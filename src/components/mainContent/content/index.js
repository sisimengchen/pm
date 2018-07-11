import './index.less';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import UnitMain from '../../ui/unitMain';
import { Layout, Modal, Upload, message, Card, Icon, Row, Col, Button } from 'antd';
import unitAction from '../../../actions';
// import 'whatwg-fetch';
import request from '@utils/request';
import pagemak from '../pagemake/index.js';
const { Header, Footer, Sider, Content } = Layout;
const ButtonGroup = Button.Group;

class PageContent extends React.PureComponent {
  static propTypes = {
    unit: ImmutablePropTypes.list
  };

  constructor(props) {
    super(props);
    this.state = {
      import_errTip: '',
      import_visible: false,
      import_confirmLoading: false,

      errTip1: '',
      errTip2: '',
      stateTip: '',
      stateOK: false,
      placeholder: '请输入发布密码',
      visible: false,
      confirmLoading: false
    };
  }

  handleChange({ file, fileList }) {
    unitAction.clear();
    if (file.status !== 'uploading') {
      console.log('正在导入...');
    }
    if (file.status === 'done') {
      console.log('导入完成！');
      const { code, data } = file.response;
      this.setState({
        import_errTip: '',
        import_visible: false,
        import_confirmLoading: false
      });
      if (code === 200) {
        const { files } = data;
        // console.log(file.response.file.data);
        unitAction.insert(files[0].data);
        message.success(`${file.name} 导入成功！`);
      } else {
        message.error(`${file.name} 导入失败：${file.response.message} ！`);
      }
    } else if (file.status === 'error') {
      console.log('导入失败！');
      message.error(`${file.name} 导入失败！`);
    }
  }

  onImportOk() {
    const dirname = this.refs.dirname.value.trim();
    if (dirname === '') {
      this.setState({
        import_errTip: '发布目录不能为空'
      });
      return;
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dirname)) {
      this.setState({
        import_errTip: '目录名称是以字母或下划线开头，后面跟字母、数字或下划线的字符'
      });
      return;
    }
    this.setState({
      import_confirmLoading: true
    });
    request(`/api/v1/pagemaker/config/${dirname}`, {
      method: 'GET'
    })
      .then((resdata) => {
        const { code, message, data } = resdata;
        this.setState({
          import_confirmLoading: false
        });
        if (code === 200) {
          this.setState({
            import_errTip: '',
            import_visible: false,
            import_confirmLoading: false
          });
          unitAction.insert(data);
          message.success(`${dirname}目录导入成功！`);
        } else {
          this.setState({
            import_errTip: message
          });
        }
      })
      .catch((e) => {
        this.setState({
          import_confirmLoading: false
        });
        console.log(e);
      });
  }

  onImportCancel() {
    this.setState({
      import_visible: false
    });
    setTimeout(() => {
      this.refs.dirname.value = '';
      this.setState({
        import_errTip: '',
        import_confirmLoading: false
      });
    }, 500);
  }

  import() {
    this.setState({ import_visible: true });
  }

  export() {
    const config = JSON.parse(localStorage.getItem('config') || '');
    request('/api/v1/common/download', {
      method: 'POST',
      body: config
    })
      .then((resdata) => {
        const { code, message, data } = resdata;
        const a = document.createElement('a');
        a.href = data.url;
        a.download = 'config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  clearPage() {
    Modal.confirm({
      title: '确认清空所有配置?',
      onOk() {
        unitAction.clear();
      },
      onCancel() {}
    });
  }

  showModal() {
    this.setState({ visible: true });
    setTimeout(() => {
      this.submitBtn = document.getElementById('releaseBtn');
      this.submitBtn.setAttribute('disabled', 'disabled');
    }, 0);
  }

  handleInput() {
    const dirname = this.refs.dirname.value.trim();
    const password = this.refs.password.value.trim();
    const code = this.refs.code.value.trim();
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dirname) && password != '' && code != '') {
      this.setState({ stateOK: true });
      this.submitBtn.removeAttribute('disabled');
    } else {
      this.setState({ stateOK: false });
      this.submitBtn.setAttribute('disabled', 'disabled');
    }
  }

  handleBlur() {
    const dirname = this.refs.dirname.value.trim();
    if (dirname == '') {
      this.setState({
        errTip1: '',
        stateTip: '',
        placeholder: '请输入发布密码'
      });
      return;
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dirname)) {
      this.setState({
        errTip1: '目录名称是以字母或下划线开头，后面跟字母、数字或下划线的字符',
        stateTip: '',
        placeholder: '请输入发布密码'
      });
      return;
    }
    request(`/api/v1/pagemaker/record/${dirname}`, {
      method: 'GET'
    })
      .then((resdata) => {
        const { code, message, data } = resdata;
        if (code == 200) {
          this.setState({
            errTip1: '',
            stateTip: '这是一个新的发布目录，请创建您的发布密码并牢记，以便下次更新发布内容',
            placeholder: '请创建发布密码'
          });
        } else {
          this.setState({
            errTip1: '',
            stateTip: '发布目录已存在，确认覆盖请输入发布密码',
            placeholder: '请输入发布密码'
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  prepareData() {
    const { unit } = this.props;
    const units = unit.toJS();
    return encodeURI(pagemak(units, false));
  }

  handleOk() {
    if (!this.state.stateOK) {
      return;
    }
    const { unit } = this.props;
    const config = unit.toJS();
    const path = this.refs.dirname.value.trim();
    const productcode = this.refs.password.value.trim();
    const password = this.refs.code.value.trim();
    const html = this.prepareData();
    this.setState({
      confirmLoading: true
    });
    request('/api/v1/pagemaker/page', {
      method: 'POST',
      body: { path, password, productcode, html, config }
    })
      .then((resdata) => {
        this.setState({
          confirmLoading: false
        });
        const { code, message, data } = resdata;
        if (code == 200) {
          this.setState({
            visible: false
          });
          Modal.success({
            title: '页面发布成功!',
            content: (
              <div>
                {' '}
                查看发布的页面{' '}
                <a href={ data.url } target="_blank">
                  {' '}
                  点击这里{' '}
                </a>
              </div>
            )
          });
        } else {
          this.setState({
            errTip2: message
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleCancel() {
    this.setState({
      visible: false
    });
    setTimeout(() => {
      this.refs.dirname.value = '';
      this.refs.password.value = '';
      this.refs.code.value = '';
      this.setState({
        errTip1: '',
        errTip2: '',
        stateTip: '',
        stateOK: false,
        placeholder: '请输入发布密码',
        confirmLoading: false
      });
    }, 500);
  }

  released() {
    window.open('/pagemaker/logs', '_blank');
  }

  render() {
    const { unit } = this.props;
    const {
      import_errTip,
      import_visible,
      import_confirmLoading,
      visible,
      confirmLoading,
      stateTip,
      placeholder,
      errTip1,
      errTip2
    } = this.state;
    const uploadProps = {
      name: 'file',
      action: '/api/v1/common/upload',
      accept: '.json',
      onChange: this.handleChange.bind(this)
    };
    return (
      <Layout className="units-layout">
        <Header style={{ background: '#fff', paddingLeft: '15px' }}>
          <ButtonGroup>
            <Button icon="upload" onClick={this.import.bind(this)}>
              导入
            </Button>
            <Button icon="download" onClick={this.export.bind(this)}>
              导出
            </Button>
            <Button icon="delete" onClick={this.clearPage.bind(this)}>
              清空
            </Button>
            <Button icon="solution" onClick={this.released.bind(this)}>
              日志
            </Button>
            <Button type="primary" icon="folder-add" onClick={this.showModal.bind(this)}>
              发布
            </Button>
          </ButtonGroup>
        </Header>
        <UnitMain unit={unit} />
        <Modal
          title="导入配置"
          wrapClassName="upload-dialog"
          visible={import_visible}
          maskClosable={false}
          confirmLoading={import_confirmLoading}
          onOk={this.onImportOk.bind(this)}
          onCancel={this.onImportCancel.bind(this)}
        >
          <div className="m-upload">
            <em>1、上传本地json配置文件，</em>
            <span>
              <Upload {...uploadProps}>点击这里</Upload>
            </span>
          </div>
          <div className="m-dirname">
            <label>2、输入目录名称</label>
            <input
              ref="dirname"
              name="发布目录"
              type="text"
              placeholder="请输入发布目录"
              onFocus={() => {
                this.setState({ import_errTip: '' });
              }}
            />
            <p className="errTip">
              <i className={`iconfont icon-cuowu ${import_errTip == '' ? 'f-hide' : ''}`} />
              {import_errTip}
            </p>
          </div>
        </Modal>
        <Modal
          title="请输入发布信息"
          wrapClassName="publish-dialog"
          maskClosable={false}
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>
              取消
            </Button>,
            <Button
              key="submit"
              id="releaseBtn"
              type="primary"
              size="large"
              loading={confirmLoading}
              onClick={this.handleOk.bind(this)}
            >
              发布
            </Button>
          ]}
        >
          <div className="dirname f-cb">
            <label> 发布目录 </label>
            <input
              ref="dirname"
              name="发布目录"
              type="text"
              placeholder="请输入发布目录"
              onInput={this.handleInput.bind(this)}
              onFocus={() => {
                this.setState({ errTip1: '', stateTip: '' });
              }}
              onBlur={this.handleBlur.bind(this)}
            />
            <p className={`err-p ${errTip1 == '' && this.refs.dirname != '' ? 'f-hide' : ''}`}>
              <i className={`iconfont icon-cuowu ${errTip1 == '' ? 'f-hide' : ''}`}> </i>
              {errTip1}
            </p>
            <p className={`ok-p ${errTip1 == '' && this.refs.dirname != '' ? '' : 'f-hide'}`}>
              <i className={`iconfont icon-dui ${stateTip == '' ? 'f-hide' : ''}`} />
              {stateTip}
            </p>
          </div>
          <div className="code">
            <label>发布密码</label>
            <input
              ref="code"
              name="发布密码"
              type="password"
              placeholder={placeholder}
              onInput={this.handleInput.bind(this)}
              onFocus={() => {
                this.setState({ errTip2: '' });
              }}
            />
          </div>
          <div className="password">
            <label>平台密码</label>
            <input
              ref="password"
              name="平台密码"
              type="password"
              placeholder="请输入平台密码"
              onInput={this.handleInput.bind(this)}
              onFocus={() => {
                this.setState({ errTip2: '' });
              }}
            />
            <p className="errTip2">
              <i className={`iconfont icon-cuowu ${errTip2 == '' ? 'f-hide' : ''}`} /> {errTip2}
            </p>
          </div>
        </Modal>
      </Layout>
    );
  }
}

export default connect((state) => {
  console.log(state.get('Reducers'));
  return { unit: state.get('Reducers') };
})(PageContent);
