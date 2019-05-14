import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ProfessionalUpload from './index';
import { Form, Input, Modal, message } from 'antd';
import actions from 'redux/actions';

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitIndex: -1,
      unit: undefined,
      propName: undefined,
      propValue: undefined,
      list: [],
      visible: false
    };
  }

  show(data = {}) {
    const { unitIndex, unit, propName } = data;
    this.setState({
      unitIndex,
      unit,
      propName,
      propValue: unit.get(propName),
      list: [unit.get(propName)],
      visible: true
    });
  }

  hide() {
    this.setState({
      unitIndex: -1,
      unit: undefined,
      propName: undefined,
      propValue: undefined,
      list: [],
      visible: false
    });
  }

  onSubmit = () => {
    if (this.isUploading()) {
      return;
    }
    const { unitIndex, unit, propName, propValue } = this.state;
    unitIndex > -1 && actions.updateUnit(unitIndex, propName, propValue);
    this.setState({ visible: false });
  };

  isUploading() {
    if (this.professionalUpload) {
      this.professionalUpload.state.isUploading && message.error('请耐心等待');
      return this.professionalUpload.state.isUploading;
    } else {
      return false;
    }
  }

  render() {
    const { visible, unit, propName, propValue, list = [] } = this.state;
    return (
      <Modal
        className="components-professional-upload-modal"
        title="源URL编辑"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={() => {
          if (this.isUploading()) {
            return;
          }
          this.setState({ visible: false });
        }}
        okText="确认"
        cancelText="取消"
      >
        {unit && propName ? (
          <Form>
            <Form.Item>
              <Input
                value={propValue}
                onChange={(event) => {
                  this.setState({ propValue: event.target.value });
                }}
              />
            </Form.Item>
            <Form.Item>
              <ProfessionalUpload
                {...this.props}
                list={list}
                onChange={(file = {}) => {
                  list.push(file);
                  this.setState({ list, propValue: file.url });
                }}
                ref={ref => (this.professionalUpload = ref)}
              />
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    );
  }
}

let uploadModal = null;

const dom = document.createElement('div');
document.body.append(dom);
ReactDOM.render(
  <UploadModal
    ref={(ref) => {
      uploadModal = ref;
    }}
  />,
  dom
);

window.uploadModal = uploadModal;
export default uploadModal;
