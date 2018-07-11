import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

import { ChromePicker } from 'react-color';
import { Icon, Row, Col, Input, InputNumber, Tooltip } from 'antd';

class UnitQrcode extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
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
    unitAction.editUnit(id, 'bgColor', color.hex);
  };

  changeContent = (index, type, value) => {
    const { data, id } = this.props;
    const datajs = data.toJS();
    datajs[type][index] = value;
    unitAction.editUnit(id, type, immutable.fromJS(datajs[type]));
  };

  render() {
    const { data, id } = this.props;
    const { displayColorPicker } = this.state;
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
            内容
          </Col>
          <Col span={14}>
            <Input
              type="text"
              placeholder="自定义二维码的内，不填默认是发布后页面地址"
              defaultValue={data.get('url')}
              onBlur={e => unitAction.editUnit(id, 'url', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            填充颜色
          </Col>
          <Col span={14}>
            <Input
              type="text"
              placeholder="填充颜色"
              value={data.get('bgColor')}
              style={{ background: data.get('bgColor') }}
              onClick={this.handleClick}
              onChange={e => unitAction.editUnit(id, 'bgColor', e.target.value)}
            />
            {this.state.displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <ChromePicker color={data.get('bgColor')} onChange={this.handleChange} />
              </div>
            ) : null}
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
      </UnitPanel>
    );
  }
}

export default UnitQrcode;
