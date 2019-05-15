import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const CssUnit = props => (
  <Form className="components-unit components-unit-css" {...formItemLayout}>
    <PropComponet key="css" propName="css" {...props} />
  </Form>
);

export default CssUnit;
