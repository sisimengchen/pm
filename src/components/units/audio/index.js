import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

import { Icon, Row, Col, Button, Radio, Input, InputNumber, Tooltip, Collapse, Upload, message } from 'antd';

class UnitAudio extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadProps: {
        name: 'file',
        action: '/api/v1/common/upload',
        accept: 'medič/*',
        onChange({ file, fileList }) {
          if (file.status !== 'uploading') {
            console.log('正在上传...');
          }
          if (file.status === 'done') {
            console.log('上传完成！');
            const { code, data } = file.response;
            if (code === 200) {
              const { files } = data;
              unitAction.editUnit(props.id, 'address', files[0].url);
              message.success(`${file.name} 上传成功！`);
            } else {
              message.error(`${file.name} 上传失败：${file.response.message} ！`);
            }
          } else if (file.status === 'error') {
            console.log('上传失败！');
            message.error(`${file.name} 上传失败！`);
          }
        }
      }
    };
  }

  changeContent(index, type, value) {
    const { data, id } = this.props;
    const datajs = data.toJS();
    datajs[type][index] = value;
    unitAction.editUnit(id, type, immutable.fromJS(datajs[type]));
  }

  render() {
    const { data, id } = this.props;
    const { uploadProps } = this.state;
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            音频地址
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="音频文件或地址，支持wav/mp3格式"
              value={data.get('address')}
              onChange={e => unitAction.editUnit(id, 'address', e.target.value)}
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
        {/* <Row type="flex" justify="left" align="middle" gutter={16}>
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
        </Row> */}
      </UnitPanel>
    );
  }
}

export default UnitAudio;
