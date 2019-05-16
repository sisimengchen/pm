import React, { PureComponent, Fragment } from 'react';
import actions from 'redux/actions';
import { Collapse, Icon } from 'antd';

import './index.less';

class UnitPanel extends PureComponent {
  static defaultProps = {
    unit: undefined,
    unitIndex: -1
  };

  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  componentDidMount() {}

  editName = (e) => {
    const { unitIndex } = this.props;
    unitIndex > -1 && actions.updateUnit(unitIndex, 'unitName', e.target.value);
  };

  removeUnit() {
    const { unitIndex } = this.props;
    unitIndex > -1 && actions.removeUnit(unitIndex);
  }

  copyUnit() {
    const { unitIndex } = this.props;
    unitIndex > -1 && actions.copyUnit(unitIndex);
  }

  toggleCollapse = () => {
    const { unit, unitIndex } = this.props;
    const collapse = unit.get('collapse') || 1;
    unitIndex > -1 && actions.updateUnit(unitIndex, 'collapse', ~collapse + 1);
  };

  render() {
    const { unit } = this.props;
    const collapse = unit.get('collapse') || 1;
    const unitName = unit.get('unitName');
    const editable = unit.get('editable');
    const unique = unit.get('unique');
    return (
      <div
        className="components-layout-unitpanel"
        ref={(ref) => {
          this.panel = ref;
        }}
      >
        <Collapse activeKey={collapse === 1 ? '1' : undefined} onChange={this.toggleCollapse}>
          <Collapse.Panel
            key="1"
            header={
              editable ? (
                <input
                  className="components-name-input"
                  type="text"
                  value={unitName}
                  onChange={this.editName}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : (
                <span>{unitName}</span>
              )
            }
            extra={
              <Fragment>
                {/* {editable ? <Icon type="drag" /> : null} */}
                {editable ? (
                  <Icon
                    type="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.removeUnit(e);
                    }}
                  />
                ) : null}
                {unique ? null : (
                  <Icon
                    type="copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.copyUnit(e);
                    }}
                  />
                )}
              </Fragment>
            }
          >
            {this.props.children}
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}

export default UnitPanel;
