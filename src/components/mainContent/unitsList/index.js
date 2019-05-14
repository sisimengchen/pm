import styles from './index.less';
import React from 'react';
import PropTypes from 'prop-types';

import unitAction from '../../../actions';

import { Layout, Menu, Icon, Button } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { MenuItemGroup } = Menu;

class UnitsList extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e && e.key && unitAction.addUnit(e.key);
  }

  render() {
    return (
      <Sider trigger={null} collapsible breakpoint="lg" width={256}>
        <div className="logo" key="logo">
          <h1>前端页面制作工具</h1>
        </div>
        <Menu theme="dark" mode="inline" onClick={this.handleClick}>
          <SubMenu
            title={
              <span>
                <Icon type="book" />
                文字单元
              </span>
            }
          >
            <Menu.Item key="TITLE">
              <Icon type="ellipsis" />
              <span>标题</span>
            </Menu.Item>
            <Menu.Item key="BUTTON">
              <Icon type="link" />
              <span>按钮</span>
            </Menu.Item>
            <Menu.Item key="TEXTBODY">
              <Icon type="file-text" />
              <span>正文</span>
            </Menu.Item>
            <Menu.Item key="LINE">
              <Icon type="minus" />
              <span>分割线</span>
            </Menu.Item>
            {/* <Menu.Item key="RULES">
              <Icon type="exception" />
              <span>规则</span>
            </Menu.Item> */}
            {/* <Menu.Item key="OGP">
              <Icon type="team" />
              <span>开放内容协议</span>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu
            title={
              <span>
                <Icon type="video-camera" />
                多媒体单元
              </span>
            }
          >
            <Menu.Item key="IMAGE">
              <Icon type="picture" />
              <span>图片</span>
            </Menu.Item>
            <Menu.Item key="AUDIO">
              <Icon type="sound" />
              <span>音频</span>
            </Menu.Item>
            <Menu.Item key="BOTTOMFLOAT">
              <Icon type="down" />
              <span>底部浮层</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            title={
              <span>
                <Icon type="api" />
                复合单元
              </span>
            }
          >
            <Menu.Item key="CAROUSEL">
              <Icon type="switcher" />
              <span>轮播图</span>
            </Menu.Item>
            <Menu.Item key="IMAGEGIRD">
              <Icon type="appstore-o" />
              <span>图宫格</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            title={
              <span>
                <Icon type="database" />
                统计单元
              </span>
            }
          >
            <Menu.Item key="DATASYSTEM">
              <Icon type="area-chart" />
              <span>数据系统</span>
            </Menu.Item>
            {/* <Menu.Item key="NETS">
              <Icon type="bar-chart" />
              <span>章鱼统计</span>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu
            title={
              <span>
                <Icon type="code" />
                高级单元
              </span>
            }
          >
            <Menu.Item key="QRCODE">
              <Icon type="qrcode" />
              <span>二维码</span>
            </Menu.Item>
            <Menu.Item key="CODE">
              <Icon type="gitlab" />
              <span>前端代码</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default UnitsList;
