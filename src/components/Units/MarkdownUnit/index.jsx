import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const MarkdownUnit = props => (
  <Form className="components-unit components-unit-javascript" {...formItemLayout}>
    <PropComponet key="markdown" propName="markdown" {...props} />
  </Form>
);

export default MarkdownUnit;
