import './index.less';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import reactCSS from 'reactcss';

import unitAction from '../../../actions';
import UnitPanel from '../../ui/unitPanel';

import { Icon, Row, Col, Button, Collapse, Input } from 'antd';
const Panel = Collapse.Panel;

class UnitOgp extends React.PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      contents: data.get('contents').toJS() || []
    };
  }

  addContent = () => {
    const { id } = this.props;
    const { contents } = this.state;
    contents.push({ property: '', content: '' });
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
    return contents.map((item, index) => (
        <Panel
          key={index}
          header={
            <div>
              <span>OGP{index + 1}</span>
              <Icon type="close" onClick={e => this.removeContent(index)} />
            </div>
          }
        >
          <Row type="flex" justify="left" align="middle" gutter={16}>
            <Col className="title" span={4}>
              属性
            </Col>
            <Col span={14}>
              <Input
                type="text"
                size="large"
                placeholder="属性"
                defaultValue={item.property}
                onBlur={e => this.changeContent(index, 'property', e.target.value)}
              />
            </Col>
          </Row>
          <Row type="flex" justify="left" align="middle" gutter={16}>
            <Col className="title" span={4}>
              内容
            </Col>
            <Col span={14}>
              <Input
                type="text"
                size="large"
                placeholder="内容"
                defaultValue={item.content}
                onBlur={e => this.changeContent(index, 'content', e.target.value)}
              />
            </Col>
          </Row>
        </Panel>
    ));
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
              添加协议<Icon type="plus" />
            </Button>
          </Col>
        </Row>
      </UnitPanel>
    );
  }
}

export default UnitOgp;
