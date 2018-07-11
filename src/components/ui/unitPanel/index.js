/**
 * unit面板
 * @auther 孟辰
 */
import './index.less';
import React from 'react';
import PropTypes from 'prop-types';
import unitAction from '../../../actions';
import { Modal, Icon } from 'antd';

class UnitPanel extends React.Component {
  static propTypes = {
    unitId: PropTypes.number,
    unitName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  removeUnit(unitId) {
    Modal.confirm({
      title: '删除面板?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        unitAction.removeUnit(unitId);
      },
      onCancel() {}
    });
  }

  renderLeftEditor() {
    const { unitId, unitName, editable } = this.props;
    if (editable) {
      return (
        <div className="left-editor">
          <Icon type="edit" />
          <input
            type="text"
            value={unitName}
            ref="name"
            onChange={() => unitAction.editUnit(unitId, 'name', this.refs.name.value)}
          />
        </div>
      );
    } else {
      return (
        <div className="left-editor">
          <span>{unitName}</span>
        </div>
      );
    }
  }

  renderRightEditor() {
    const { unitId, unitName, editable } = this.props;
    const { collapse } = this.state;
    return (
      <div className={`right-editor ${editable ? 'editable' : ''}`}>
        <Icon type="delete" onClick={e => this.removeUnit(unitId)} />
        <Icon type="copy" onClick={e => unitAction.copyUnit(unitId)} />
        <i className="icon iconfont icon-yidong move" />
        {collapse ? (
          <Icon type="down" className="collapse" onClick={() => this.setState({ collapse: !collapse })} />
        ) : (
          <Icon type="up" className="collapse" onClick={() => this.setState({ collapse: !collapse })} />
        )}
      </div>
    );
  }

  render() {
    const { unitId, unitName, editable, children } = this.props;
    const { collapse } = this.state;
    return (
      <div className="unit-panel" data-id={unitId} data-editable={editable} ref="myPanel">
        <div className="header">
          {this.renderLeftEditor()}
          {this.renderRightEditor()}
        </div>
        <div className={`content ${collapse ? 'active' : 'close'}`}>{children}</div>
      </div>
    );
  }
}
UnitPanel.defaultProps = {
  editable: true
};
export default UnitPanel;
