import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';
import request from '@utils/request';

import { Icon, Row, Col, Button, Radio, Input, InputNumber, Tooltip, Collapse, Upload, message } from 'antd';

class UnitMeta extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
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
            message.error(`${file.name} 上传失败！`);
          }
        }
      }
    };
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { id } = this.props;
    unitAction.editUnit(id, 'bgColor', color.hex);
  };

  render() {
    const { data, id } = this.props;
    const { displayColorPicker, uploadProps } = this.state;

    const styles = reactCSS({
      default: {
        popover: {
          // 这里不能用绝对定位，外层容器有溢出隐藏属性
          position: 'fixed',
          marginLeft: '108px',
          marginTop: '3px',
          zIndex: 2
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });
    return (
      <UnitPanel unitId={id} unitName={data.get('name')} editable={false}>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            页面标题
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="页面标题"
              defaultValue={data.get('title')}
              onBlur={e => unitAction.editUnit(id, 'title', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            页面关键词
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="页面关键词"
              defaultValue={data.get('keywords')}
              onBlur={e => unitAction.editUnit(id, 'keywords', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            页面描述
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="页面描述"
              defaultValue={data.get('desc')}
              onBlur={e => unitAction.editUnit(id, 'desc', e.target.value)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            页面背景
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="填充颜色"
              value={data.get('bgColor')}
              style={{ background: data.get('bgColor') }}
              onClick={this.handleClick}
              onChange={e => unitAction.editUnit(id, 'bgColor', e.target.value)}
            />
            {this.state.displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <ChromePicker color={data.get('bgColor')} onChange={this.handleChange} />
              </div>
            ) : null}
          </Col>
        </Row>
        <Row type="flex" justify="left" align="middle" gutter={16}>
          <Col className="title" span={4}>
            分享图片
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
            分享控件
          </Col>
          <Col span={12}>
            <Input
              type="text"
              placeholder="分享控件"
              defaultValue={`pm://www.lmlc.com/cmd?uid=${data.get('uid')}`}
              readOnly
            />
          </Col>
          <Col span={4}>
            <Tooltip placement="topLeft" title={'需配合跳转链接使用，掉起分享控件'}>
              <a href="#">如何使用？</a>
            </Tooltip>
          </Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitMeta;
