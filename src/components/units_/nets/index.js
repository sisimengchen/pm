import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import { Icon, Row, Col, Button } from 'antd';
import { ChromePicker } from 'react-color';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

class UnitNets extends React.PureComponent {
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

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { id } = this.props;
    this.refs.color.value = color.hex;
    unitAction.editUnit(id, 'color', color.hex);
    // 需要阻止点透
  };

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  render() {
    const { data, id } = this.props;
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col span={24}>添加该组件后，会向章鱼系统发送url（发布后可知）访问请求；</Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitNets;
