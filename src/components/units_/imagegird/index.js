import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

import { Icon, Row, Col, Button, Radio, Input, InputNumber, Collapse, Upload, message } from 'antd';
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UnitImageGird extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { data } = this.props;
    const me = this;
    this.state = {
      contents: data.get('contents').toJS() || [],
      uploadProps: {
        name: 'file',
        action: '/api/v1/common/upload',
        accept: 'image/*',
        onChange({ file, fileList, event }) {
          if (file.status !== 'uploading') {
            console.log('正在上传...');
          }
          if (file.status === 'done') {
            const { code, data } = file.response;
            if (code === 200) {
              const { files } = data;
              message.success(`${file.name} 上传成功！`);
              if (files[0].index > -1) {
                me.changeContent(files[0].index, 'address', files[0].url);
              }
            } else {
              message.error(`${file.response.message}，上传失败！`);
            }
          } else if (file.status === 'error') {
            message.error(`${file.name} 上传失败！`);
          }
        }
      }
    };
  }

  addContent = () => {
    const { id } = this.props;
    const { contents } = this.state;
    contents.push({ address: '', link: '', title: '', girdStyle: '' });
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  changeContent = (index, type, value) => {
    const { id } = this.props;
    const { contents } = this.state;
    contents[index][type] = value;
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  removeContent = (index) => {
    const { id } = this.props;
    const { contents } = this.state;
    contents.splice(index, 1);
    unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
  };

  renderContents(contents) {
    const { uploadProps } = this.state;
    return contents.map((item, index) => {
      uploadProps.action = `/api/v1/common/upload?index=${index}`;
      return (
        <Panel
          key={index}
          header={
            <div>
              <span>图宫格{index + 1}</span>
              <Icon type="close" onClick={e => this.removeContent(index)} />
            </div>
          }
        >
          <Row type="flex" justify="left" align="middle" gutter={16}>
            <Col className="title" span={4}>
              图片地址
            </Col>
            <Col span={14}>
              <Input
                type="text"
                placeholder="输入完整图片地址，或上传图片"
                value={item.address}
                onChange={e => this.changeContent(index, 'address', e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Col>
          </Row>
          <Row type="flex" justify="left" align="middle" gutter={16}>
            <Col className="title" span={4}>
              跳转链接
            </Col>
            <Col span={14}>
              <Input
                type="text"
                placeholder="图片点击跳转地址"
                defaultValue={item.link}
                onBlur={e => this.changeContent(index, 'link', e.target.value)}
              />
            </Col>
          </Row>
          <Row type="flex" justify="left" align="middle" gutter={16}>
            <Col className="title" span={4}>
              标题
            </Col>
            <Col span={14}>
              <Input
                type="text"
                placeholder="标题内容"
                defaultValue={item.title}
                onBlur={e => this.changeContent(index, 'title', e.target.value)}
              />
            </Col>
          </Row>
        </Panel>
      );
    });
  }

  render() {
    const { data, id } = this.props;
    const { contents } = this.state;
    const styles = reactCSS({ default: {} });
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <Collapse>{this.renderContents(contents)}</Collapse>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col span={24}>
            <Button type="primary" onClick={this.addContent}>
              添加宫格<Icon type="plus" />
            </Button>
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            布局
          </Col>
          <Col span={20}>
            <RadioGroup
              value={data.get('girdStyle')}
              onChange={e => unitAction.editUnit(id, 'girdStyle', e.target.value)}
            >
              <RadioButton value="horizontal2">横置二列</RadioButton>
              <RadioButton value="vertical2">纵置二列</RadioButton>
              <RadioButton value="vertical3">纵置三列</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitImageGird;
