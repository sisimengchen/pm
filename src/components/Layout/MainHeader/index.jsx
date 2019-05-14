import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import actions from 'redux/actions';

export default class MainHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout.Header className="components-layout-mainheader" {...this.props}>
        <p className="contentLink">
          <a>
            <Icon
              type="undo"
              onClick={() => {
                actions.undo();
              }}
            />
            撤销
          </a>
          <a>
            <Icon
              type="redo"
              onClick={() => {
                actions.redo();
              }}
            />
            恢复
          </a>
          <a>
            <Icon
              type="more"
              onClick={() => {
                actions.collapse();
              }}
            />
            全部展开
          </a>
          <a>
            <Icon
              type="ellipsis"
              onClick={() => {
                actions.unCollapse();
              }}
            />
            全部隐藏
          </a>
          <a>
            <Icon type="import" />
            导入
          </a>
          <a>
            <Icon type="export" />
            导出
          </a>
          <a>
            <Icon type="delete" />
            删除
          </a>
          <a>
            <Icon type="database" />
            记录
          </a>
          <a>
            <Icon type="global" />
            发布
          </a>
        </p>
      </Layout.Header>
    );
  }
}
