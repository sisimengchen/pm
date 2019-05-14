import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';
import { ChromePicker } from 'react-color';
import { Icon, Row, Col, Button, Radio, Input, InputNumber, Collapse, message, Checkbox, Tooltip } from 'antd';
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class UnitTextBody extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { data } = this.props;
    const arr = ['changeLine', 'retract', 'bigLH', 'bigPD', 'noUL', 'borderRadius'];
    const defaultCheckList = [];
    arr.map((item) => {
      if (data.get(item)) {
        defaultCheckList.push(item);
      }
    });
    // console.log(defaultCheckList)
    const me = this;
    this.state = {
      checkList: defaultCheckList
    };
    console.log(this.state.checkList);
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

  moreOptions = (value) => {
    const { id } = this.props;
    const arr = ['changeLine', 'retract', 'bigLH', 'bigPD', 'noUL', 'borderRadius'];
    arr.map((item) => {
      unitAction.editUnit(id, item, false);
    });
    value.map((item, index) => {
      unitAction.editUnit(id, item, true);
    });
  };

  render() {
    const { data, id } = this.props;
    const { displayTextColorPicker, displayBgColorPicker } = this.state;
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
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            正文内容
          </Col>
          <Col span={12}>
            <TextArea
              rows={4}
              defaultValue={data.get('text')}
              onBlur={e => unitAction.editUnit(id, 'text', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            正文颜色
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="正文颜色"
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
            布局
          </Col>
          <Col span={20}>
            <RadioGroup
              value={data.get('textAlign')}
              onChange={e => unitAction.editUnit(id, 'textAlign', e.target.value)}
            >
              <RadioButton value="left">居左</RadioButton>
              <RadioButton value="center">居中</RadioButton>
              <RadioButton value="right">居右</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            字体大小
          </Col>
          <Col span={20}>
            <RadioGroup
              value={data.get('fontSize')}
              onChange={e => unitAction.editUnit(id, 'fontSize', e.target.value)}
            >
              <RadioButton value="small">小</RadioButton>
              <RadioButton value="middle">中</RadioButton>
              <RadioButton value="big">大</RadioButton>
              <RadioButton value="superbig">超大</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            其他
          </Col>
          <Col span={20}>
            <CheckboxGroup onChange={value => this.moreOptions(value)} defaultValue={this.state.checkList}>
              <Row>
                <Col span={12}>
                  <Checkbox value="changeLine" checked={data.get('changeLine')}>
                    回车换行
                  </Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="retract">换行缩进</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Checkbox value="bigLH">大行距</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="bigPD">大段距</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Checkbox value="noUL">链接无下划线</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="borderRadius">圆角边框</Checkbox>
                </Col>
              </Row>
            </CheckboxGroup>
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            正文背景
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="正文背景"
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
      </UnitPanel>
    );
  }
}

export default UnitTextBody;
