import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const JavascriptUnit = props => (
  <Form className="components-unit components-unit-javascript" {...formItemLayout}>
    <PropComponet key="javascript" propName="javascript" {...props} />
  </Form>
);

export default JavascriptUnit;
