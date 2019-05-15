import React, { PureComponent } from 'react';
import actions from 'redux/actions';
import { Layout, Menu, Icon } from 'antd';
import './index.less';

class UnitMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  addUnit = (event) => {
    event && event.key && actions.addUnit(event.key);
  };

  render() {
    return (
      <Layout.Sider
        // trigger={null}
        // collapsible
        // breakpoint="lg"
        // width={256}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" key="logo">
          <h1>pm</h1>
          {/* <h1>前端页面制作工具</h1> */}
        </div>
        <Menu theme="dark" mode="inline" onClick={this.addUnit}>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="book" />
                <span>文字单元</span>
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
          </Menu.SubMenu>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="video-camera" />
                <span>多媒体单元</span>
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
          </Menu.SubMenu>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="api" />
                <span>复合单元</span>
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
          </Menu.SubMenu>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="database" />
                <span>统计单元</span>
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
          </Menu.SubMenu>
          {/* <Menu.SubMenu
            title={
              <span>
                <Icon type="code" />
                <span>高级单元</span>
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
          </Menu.SubMenu> */}
          <Menu.SubMenu
            title={
              <span>
                <Icon type="code" />
                <span>文档</span>
              </span>
            }
          >
            <Menu.Item key="JAVACRIPT">
              <Icon type="github" />
              <span>javascript</span>
            </Menu.Item>
            <Menu.Item key="CSS">
              <Icon type="sketch" />
              <span>css</span>
            </Menu.Item>
            <Menu.Item key="HTML">
              <Icon type="html5" />
              <span>html</span>
            </Menu.Item>
            <Menu.Item key="MARKDOWN">
              <Icon type="file-markdown" />
              <span>markdown</span>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default UnitMenu;
