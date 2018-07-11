import React, { PropTypes } from 'react';
import UnitsList from '@components/mainContent/unitsList';
import UnitsContent from '@components/mainContent/content';
import Preview from '@components/mainContent/preview';
import unitAction from '../actions';
import request from '@utils/request';
import { Layout, Icon, Menu, Row, Col } from 'antd';
const { Header, Footer, Content } = Layout;
class App extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleClick = (e) => {
    if (e.key) {
      unitAction.addUnit(e.key);
    }
  };

  componentDidMount() {
    // request('/api/v1/user', {
    //   method: 'GET'
    // })
    //   .then((resdata) => {
    //     const { code, message, data } = resdata;
    //     this.setState({
    //       user: data
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  render() {
    const { user } = this.state;
    return (
      <Layout>
        <UnitsList />
        <Layout>
          <Header className="header" style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Row gutter={8}>
              <Col span={16}>
                <UnitsContent />
              </Col>
              <Col span={8}>
                <Preview />
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright©2018 立马理财前端组出品</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
