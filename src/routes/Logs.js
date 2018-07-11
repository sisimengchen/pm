import React from 'react';
import moment from 'moment';
import request from '@utils/request';

import { Icon, Table, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const columns = [
  {
    title: '用户',
    dataIndex: 'UserName',
    key: 'userName',
    filters: [{ text: '自己', value: 'mengchen@corp.netease.com' }],
    onFilter: (value, record) => record.UserName.indexOf(value) === 0
  },
  {
    title: '发布目录',
    dataIndex: 'DirName',
    key: 'dirName'
  },
  {
    title: '时光机',
    dataIndex: 'TimeMechine',
    key: 'timeMechine',
  },
  {
    title: '发布时间',
    dataIndex: 'PublishTime',
    key: 'publishTime'
  }
];

class Released extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      filteredInfo: null
    };
  }

  handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
  };

  // 异步接口获取数据库信息
  componentDidMount() {
    // this.fetch();
    request('/api/v1/pagemaker/records', {
      method: 'GET'
    }).then((retdata) => {
      const { code, message, data } = retdata;
      if (code === 200) {
        const tempArr = [];
        data.forEach((item, index) => {
          tempArr.push({
            key: index,
            UserName: item.email,
            DirName: item.path,
            TimeMechine: item.create_time,
            PublishTime: moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')
          });
        });
        const pagination = { ...this.state.pagination };
        // Read total count from server
        pagination.total = tempArr.size;
        this.setState({
          loading: false,
          data: tempArr,
          pagination
        });
      } else {
        console.log(message);
      }
    });
  }

  render() {
    return (
      <Layout style={{ overflow: 'auto', height: '100vh' }}>
        <Table
          columns={columns}
          // rowKey={record => record.uid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          style={{ display: 'block', width: '800px', margin: '0 auto', backgroundColor: '#ffffff' }}
        />
      </Layout>
    );
  }
}

export default Released;
