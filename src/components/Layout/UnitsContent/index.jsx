import React, { PureComponent } from 'react';
import { Layout, Icon, Menu, Row, Col } from 'antd';
import { connect } from 'react-redux';
import UnitFactory from 'components/Units';
import './index.less';

class UnitContent extends PureComponent {
  static defaultProps = {
    units: []
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { units } = this.props;
    return (
      <Layout className="components-layout-unitcontent">
        {units.map((unit, unitIndex) => (
          <UnitFactory key={unit.get('unitId')} unit={unit} unitIndex={unitIndex} />
        ))}
      </Layout>
    );
  }
}

const mapStateToProps = ({ units }) => ({
  units: units
});

export default connect(mapStateToProps)(UnitContent);
