import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const JsonUnit = props => (
  <Form className="components-unit components-unit-json" {...formItemLayout}>
    <PropComponet key="json" propName="json" {...props} />
  </Form>
);

export default JsonUnit;
