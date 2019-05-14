import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';
import { Icon, Row, Col, Button } from 'antd';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

class UnitSwiper extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, id } = this.props;
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <ul>lkjlkjl</ul>
      </UnitPanel>
    );
  }
}

export default UnitSwiper;
