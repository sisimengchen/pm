import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ProfessionalCode from './index';
import { Form, Button, Drawer, message } from 'antd';
import actions from 'redux/actions';
import './index.less';

class ProfessionalCodeDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: undefined,
      unitIndex: -1,
      unit: undefined,
      propName: undefined,
      propValue: undefined,
      mode: '',
      visible: false
    };
    this.professionalCode = null;
  }

  show(data = {}) {
    const { label, unitIndex, unit, propName, mode } = data;
    const propValue = unit.get(propName);
    this.setState({
      label,
      unitIndex,
      unit,
      propName,
      propValue,
      mode,
      visible: true
    });
  }

  hide() {
    this.setState({
      label: undefined,
      unitIndex: -1,
      unit: undefined,
      propName: undefined,
      propValue: undefined,
      mode: '',
      visible: false
    });
  }

  onSubmit = () => {
    const { unitIndex, unit, propName, propValue } = this.state;
    unitIndex > -1 && actions.updateUnit(unitIndex, propName, this.professionalCode.getValue());
    this.hide();
  };

  render() {
    const { visible, label, unit, propName, propValue, mode } = this.state;
    return (
      <Drawer
        className="components-professional-code-drawer"
        title={label}
        width={640}
        placement="left"
        visible={visible}
        onClose={() => {
          this.hide();
        }}
      >
        {unit && propName && (
          <ProfessionalCode
            key={unit.get('uid')}
            value={propValue}
            mode={mode}
            ref={(ref) => {
              this.professionalCode = ref;
            }}
          />
        )}
        <div className="bottom">
          <Button
            style={{
              marginRight: 8
            }}
            onClick={() => {
              this.hide();
            }}
          >
            取消
          </Button>
          <Button onClick={this.onSubmit} type="primary">
            确认
          </Button>
        </div>
      </Drawer>
    );
  }
}

let professionalCodeDrawer = null;

const dom = document.createElement('div');
document.body.append(dom);
ReactDOM.render(
  <ProfessionalCodeDrawer
    ref={(ref) => {
      professionalCodeDrawer = ref;
    }}
  />,
  dom
);

export default professionalCodeDrawer;
