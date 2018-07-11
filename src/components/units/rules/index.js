import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';
import { ChromePicker } from 'react-color';
import { Icon, Row, Col, Button, Radio, Input, InputNumber, Tooltip, Collapse, Upload, message } from 'antd';
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UnitRules extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { data } = this.props;
    const me = this;
    this.state = {
      contents: data.get('contents').toJS() || [],
      displayColorPicker: false,
      showDetail: false,
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

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { id } = this.props;
    unitAction.editUnit(id, 'textColor', color.hex);
  };

  changeContent = (index, type, value) => {
    const { data, id } = this.props;
    const datajs = data.toJS();
    console.log(datajs, datajs[type], datajs[type][index], index, type, value);
    datajs[type][index] = value;
    unitAction.editUnit(id, type, immutable.fromJS(datajs[type]));
  };

  changeContent2 = (index, value) => {
    const { id } = this.props;
    const { contents } = this.state;
    contents[index] = value;
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  addContent = () => {
    const { id } = this.props;
    const { contents } = this.state;
    contents.push('');
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  removeContent = (index) => {
    const { id } = this.props;
    const { contents } = this.state;
    contents.splice(index, 1);
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  renderContents(contents) {
    return contents.map((item, index) => (
        <Row key={index} type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            规则项{index + 1}
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="规则项文案"
              defaultValue={item}
              onBlur={e => this.changeContent2(index, e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Icon type="close" onClick={e => this.removeContent(index)} />
          </Col>
        </Row>
    ));
  }

  render() {
    const { data, id } = this.props;
    const { showDetail, uploadProps, displayColorPicker, contents } = this.state;
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
        <Collapse>
          <Panel header={<span>规则</span>}>
            {this.renderContents(contents)}
            <Row type="flex" justify="left" align="middle" gutter={16}>
              <Col span={24}>
                <Button type="primary" onClick={this.addContent}>
                  添加规则<Icon type="plus" />
                </Button>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            标题文字
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="标题文字"
              defaultValue={data.get('title')}
              onBlur={e => unitAction.editUnit(id, 'title', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            标题图片
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="输入完整图片地址，或上传图片，优先于标题文字"
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
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            字体颜色
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="字体颜色"
              value={data.get('textColor')}
              style={{ background: data.get('textColor') }}
              onClick={this.handleClick}
              onChange={e => unitAction.editUnit(id, 'bgColor', e.target.value)}
            />
            {this.state.displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <ChromePicker color={data.get('textColor')} onChange={this.handleChange} />
              </div>
            ) : null}
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            字体大小
          </Col>
          <Col span={6}>
            <RadioGroup
              value={data.get('fontSize')}
              onChange={e => unitAction.editUnit(id, 'fontSize', e.target.value)}
            >
              <RadioButton value="small">小</RadioButton>
              <RadioButton value="middle">中</RadioButton>
              <RadioButton value="big">大</RadioButton>
            </RadioGroup>
          </Col>
          <Col className="title" span={4}>
            打开方式
          </Col>
          <Col span={6}>
            <RadioGroup value={data.get('openWay')} onChange={e => unitAction.editUnit(id, 'openWay', e.target.value)}>
              <RadioButton value="auto">自动</RadioButton>
              <RadioButton value="manual">手动</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            组件内边距
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="上">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['padding', 0])}
                step={10}
                onChange={value => this.changeContent(0, 'padding', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="右">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['padding', 1])}
                step={10}
                onChange={value => this.changeContent(1, 'padding', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="下">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['padding', 2])}
                step={10}
                onChange={value => this.changeContent(2, 'padding', parseFloat(value))}
              />
            </Tooltip>
          </Col>
          <Col className="title" span={3}>
            <Tooltip placement="right" title="左">
              <InputNumber
                min={0}
                defaultValue={0}
                value={data.getIn(['padding', 3])}
                step={10}
                onChange={value => this.changeContent(3, 'padding', parseFloat(value))}
              />
            </Tooltip>
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
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            规则浮层
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="规则浮层"
              defaultValue={`pm://www.lmlc.com/cmd?uid=${data.get('uid')}`}
              readOnly
            />
          </Col>
          <Col span={4}>
            <Tooltip placement="topLeft" title={'需配合跳转链接使用，掉起规则浮层'}>
              <a href="#">如何使用？</a>
            </Tooltip>
          </Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitRules;
