import React, { PureComponent, Fragment } from 'react';
import { Tag, Input, Icon, message } from 'antd';
import actions from 'redux/actions';

export default class EnumPropCompent extends PureComponent {
  static defaultProps = {
    unitIndex: -1,
    unit: undefined,
    propName: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: ''
    };
  }

  handleClose = (index) => {
    const { unitIndex, unit, propName } = this.props;
    unitIndex > -1 && actions.updateUnit(unitIndex, propName, '', `-${index}`);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      this.setState({
        inputVisible: false
      });
      return;
    }
    const { unitIndex, unit, propName } = this.props;
    const { size = 0 } = unit.get(propName);
    const isDuplicate = unit.get(propName).find((tag, index) => tag == inputValue);
    if (isDuplicate) {
      message.error('枚举值请保持唯一性');
      return;
    }
    this.setState(
      {
        inputVisible: false,
        inputValue: ''
      },
      () => {
        unitIndex > -1 && actions.updateUnit(unitIndex, propName, inputValue, `${size}`);
      }
    );
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const { unit, propName } = this.props;
    return (
      <Fragment>
        {(unit.get(propName) || []).map((tag, index) => (
          <Tag key={tag} closable={true} onClose={() => this.handleClose(index)}>
            {tag}
          </Tag>
        ))}
        {inputVisible ? (
          <Input
            ref={(ref) => {
              this.input = ref;
            }}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        ) : (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> add new
          </Tag>
        )}
      </Fragment>
    );
  }
}
