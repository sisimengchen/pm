import React from 'react';
import { Select } from 'antd';

export const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

export const getOptions = (options = []) => options.map(item => (
    <Select.Option key={item.value} title={item.label}>
      {item.label}
    </Select.Option>
));
