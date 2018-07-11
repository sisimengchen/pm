import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

import { Icon, Row, Col, Button, Radio, Input, InputNumber, Collapse, Upload, message } from 'antd';

class UnitBottomFloat extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      // defaultStyle: true,
      uploadProps: {
        name: 'file',
        action: '/api/v1/common/upload',
        accept: 'image/*',
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

  render() {
    const { data, id } = this.props;
    const { showDetail, uploadProps } = this.state;
    return (
      <UnitPanel unitId={id} unitName={data.get('name')}>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            按钮图片
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="输入完整图片地址，或上传图片"
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
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            跳转链接
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="图片点击跳转地址"
              defaultValue={data.get('url')}
              onBlur={e => unitAction.editUnit(id, 'url', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            APP命令
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="客户端功能命令，仅当在内嵌客户端时生效"
              defaultValue={data.get('appOrder')}
              onBlur={e => unitAction.editUnit(id, 'appOrder', e.target.value)}
            />
          </Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitBottomFloat;
