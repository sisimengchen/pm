import React from 'react';
import { Form } from 'antd';
import PropComponet from '../common/PropComponet';
import { formItemLayout } from '../common';

const TitleUnit = props => (
  <Form className="components-unit components-unit-meta" {...formItemLayout}>
    <PropComponet key="text" propName="text" {...props} />
    <PropComponet key="href" propName="href" {...props} />
    <PropComponet key="fontSize" propName="fontSize" {...props} />
    <PropComponet key="color" propName="color" {...props} />
    <PropComponet key="textAlign" propName="textAlign" {...props} />
    <PropComponet key="margin" propName="margin" {...props} />
    <PropComponet key="padding" propName="padding" {...props} />
    <PropComponet key="enumeration" propName="enumeration" {...props} />
  </Form>
);

export default TitleUnit;
