import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const TitleUnit = props => (
  <Form className="components-unit components-unit-meta" {...formItemLayout}>
    <PropComponet key="href" propName="href" {...props} />
    <PropComponet key="src" propName="src" {...props} />
    <PropComponet key="backgroundColor" propName="backgroundColor" {...props} />
    <PropComponet key="margin" propName="margin" {...props} />
    <PropComponet key="padding" propName="padding" {...props} />
  </Form>
);

export default TitleUnit;
