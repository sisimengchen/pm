import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const HtmlUnit = props => (
  <Form className="components-unit components-unit-javascript" {...formItemLayout}>
    <PropComponet key="html" propName="html" {...props} />
  </Form>
);

export default HtmlUnit;
