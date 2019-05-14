import React, { PureComponent } from 'react';
import { Layout, Icon, Menu, Row, Col } from 'antd';
import MainHeader from 'components/Layout/MainHeader';
import UnitsMenu from 'components/Layout/UnitsMenu';
import UnitsContent from 'components/Layout/UnitsContent';
import UnitsPreview from 'components/Layout/UnitsPreview';

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <UnitsMenu />
        <Layout>
          <MainHeader style={{ background: '#fff', padding: 0 }}/>
          <Layout.Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Row gutter={8}>
              <Col span={16}>
                <UnitsContent />
              </Col>
              <Col span={8}>
                <UnitsPreview />
              </Col>
            </Row>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>Footer</Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}
