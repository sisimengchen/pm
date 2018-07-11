import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';
import { ChromePicker } from 'react-color';
import {
  Icon,
  Row,
  Col,
  Button,
  Radio,
  Input,
  InputNumber,
  Collapse,
  Upload,
  message,
  Checkbox,
  Tooltip,
  Tabs
} from 'antd';
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class UnitButton extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { data } = this.props;
    const me = this;
    this.state = {
      uploadProps: {
        name: 'file',
        action: '/api/v1/common/upload',
        accept: 'image/*',
        onChange({ file, fileList }) {
          if (file.status !== 'uploading') {
            console.log('正在上传...');
          }
          if (file.status === 'done') {
            console.log('上传完成！');
            const { code, data } = file.response;
            if (code === 200) {
              const { files } = data;
              unitAction.editUnit(props.id, 'address', files[0].url);
              message.success(`${file.name} 上传成功！`);
            } else {
              message.error(`${file.name} 上传失败：${file.response.message} ！`);
            }
          } else if (file.status === 'error') {
            console.log('上传失败！');
            message.error(`${file.name} 上传失败！`);
          }
        }
      }
    };
  }

  handleTextClick = () => {
    this.setState({
      displayTextColorPicker: !this.state.displayTextColorPicker
    });
    // 防止点穿
    window.event.cancelBubble = true;
  };

  handleBgClick = () => {
    this.setState({
      displayBgColorPicker: !this.state.displayBgColorPicker
    });
    // 防止点穿
    window.event.cancelBubble = true;
  };

  handleClose = () => {
    this.setState({ displayTextColorPicker: false, displayBgColorPicker: false });
  };

  handleColorChange = (color) => {
    const { id } = this.props;
    unitAction.editUnit(id, 'textColor', color.hex);
  };

  handleBgColorChange = (color) => {
    const { id } = this.props;
    unitAction.editUnit(id, 'bgColor', color.hex);
  };

  changeContent = (index, type, value) => {
    const { data, id } = this.props;
    const datajs = data.toJS();
    datajs[type][index] = value;
    unitAction.editUnit(id, type, immutable.fromJS(datajs[type]));
  };

  changeSingleContent = (type, value) => {
    const { data, id } = this.props;
    const datajs = data.toJS();
    datajs[type] = value;
    unitAction.editUnit(id, type, immutable.fromJS(datajs[type]));
  };

  renderContents() {
    const { data, id } = this.props;
    return (
      <div>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            链接
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="链接"
              defaultValue={data.get('url')}
              onBlur={e => unitAction.editUnit(id, 'url', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            APP命令
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="APP命令"
              defaultValue={data.get('appOrder')}
              onBlur={e => unitAction.editUnit(id, 'appOrder', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            组件外边距
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="上">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['margin', 0])}
                step={10}
                onChange={value => this.changeContent(0, 'margin', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="右">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['margin', 1])}
                step={10}
                onChange={value => this.changeContent(1, 'margin', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="下">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['margin', 2])}
                step={10}
                onChange={value => this.changeContent(2, 'margin', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="左">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['margin', 3])}
                step={10}
                onChange={value => this.changeContent(3, 'margin', parseFloat(value))}
              />
            </Tooltip>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { data, id } = this.props;
    const { uploadProps } = this.state;
    const styles = reactCSS({
      default: {
        popover: {
          // 这里不能用绝对定位，外层容器有溢出隐藏属性
          position: 'fixed',
          marginLeft: '108px',
          marginTop: '3px',
          zIndex: 2
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <Tabs activeKey={data.get('style')} onChange={k => this._change(k)}>
          <TabPane tab="内置样式" key="default">
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                按钮文字
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  placeholder="按钮文字"
                  defaultValue={data.get('txt')}
                  onBlur={e => unitAction.editUnit(id, 'txt', e.target.value)}
                />
              </Col>
            </Row>
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                按钮高度
              </Col>
              <Col className="title" span={4}>
                <Tooltip placement="right" title="按钮高度(像素)">
                  <InputNumber
                    min={0}
                    defaultValue={50}
                    value={data.get('height')}
                    step={10}
                    onChange={value => this.changeSingleContent('height', parseFloat(value))}
                  />
                </Tooltip>
              </Col>
              <Col className="title" span={4}>
                文字大小
              </Col>
              <Col className="title" span={4}>
                <Tooltip placement="right" title="文字大小(像素)">
                  <InputNumber
                    min={12}
                    defaultValue={12}
                    value={data.get('fontSize')}
                    step={1}
                    onChange={value => this.changeSingleContent('fontSize', parseFloat(value))}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                文本颜色
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  placeholder="文本颜色"
                  value={data.get('textColor')}
                  style={{ background: data.get('textColor') }}
                  onClick={this.handleTextClick}
                  onChange={e => unitAction.editUnit(id, 'textColor', e.target.value)}
                />
                {this.state.displayTextColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <ChromePicker color={data.get('textColor')} onChange={this.handleColorChange} />
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                按钮背景
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  placeholder="按钮背景"
                  value={data.get('bgColor')}
                  style={{ background: data.get('bgColor') }}
                  onClick={this.handleBgClick}
                  onChange={e => unitAction.editUnit(id, 'bgColor', e.target.value)}
                />
                {this.state.displayBgColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <ChromePicker color={data.get('bgColor')} onChange={this.handleBgColorChange} />
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                其他
              </Col>
              <Col span={12}>
                <Checkbox
                  defaultChecked={data.get('bigRadius')}
                  onChange={e => unitAction.editUnit(id, 'bigRadius', e.target.checked)}
                >
                  大圆角
                </Checkbox>
              </Col>
            </Row>
            {this.renderContents()}
          </TabPane>
          <TabPane tab="自定义图片" key="custom">
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col className="title" span={4}>
                按钮图片
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  placeholder="输入完整图片地址，或上传图片"
                  value={data.get('address')}
                  onChange={e => unitAction.editUnit(id, 'address', e.target.value)}
                />
              </Col>
              <Col span={4}>
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> 上传
                  </Button>
                </Upload>
              </Col>
            </Row>
            {this.renderContents()}
          </TabPane>
        </Tabs>
      </UnitPanel>
    );
  }

  _change(key) {
    const { data, id } = this.props;
    unitAction.editUnit(id, 'style', key);
  }
}

export default UnitButton;
