import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const MetaUnit = props => (
  <Form className="components-unit components-unit-meta" {...formItemLayout}>
    <PropComponet key="title" propName="title" {...props} />
    <PropComponet key="keywords" propName="keywords" {...props} />
    <PropComponet key="desc" propName="desc" {...props} />
    <PropComponet key="backgroundColor" propName="backgroundColor" {...props} />
  </Form>
);

export default MetaUnit;
