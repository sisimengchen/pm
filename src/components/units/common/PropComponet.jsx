import React from 'react';
import { Form, Input, Select, Avatar } from 'antd';
import { CompactPicker } from 'react-color';
import actions from 'redux/actions';
import { getOptions } from './index';
import { propName2Config } from './propConfig';
import uploadModal from 'components/Professional/Upload/modal';

const updateUnit = function(unitIndex, propName, propValue, index) {
  unitIndex > -1 && actions.updateUnit(unitIndex, propName, propValue, index);
};

const PropComponet = function({ unitIndex, unit, propName = '' }) {
  if (!propName || !unit) {
    return null;
  }
  const propConfig = propName2Config(propName);
  if (!propConfig) {
    return <div>{`未知${propName}`}</div>;
  }
  const label = propConfig.label || '未知';
  let children = null;
  if (propConfig.display === 'upload') {
    children = (
      <Avatar
        style={{ backgroundColor: unit.get(propName) ? 'red' : null, cursor: 'pointer' }}
        onClick={() => {
          uploadModal.show({ unitIndex, unit, propName });
        }}
      >
        {unit.get(propName) ? '编辑' : '添加'}
      </Avatar>
    );
  } else if (propConfig.display === 'select' && propConfig.options && propConfig.options.length) {
    children = (
      <Select
        placeholder="请选择商家"
        value={unit.get(propName)}
        onSelect={value => updateUnit(unitIndex, propName, value)}
      >
        {getOptions(propConfig.options)}
      </Select>
    );
  } else if (propName.toLocaleLowerCase().endsWith('color')) {
    children = (
      <CompactPicker
        color={unit.get(propName)}
        onChangeComplete={color => updateUnit(unitIndex, propName, color.hex)}
      />
    );
  } else if (propConfig.display === 'inputgroup' && unit.get(propName).size) {
    const { size } = unit.get(propName);
    children = (
      <Input.Group compact={true}>
        {unit.get(propName).map((item, index) => (
          <Input
            key={index}
            style={{ width: `${100 / size}%` }}
            placeholder={`${propConfig.labels[index]}`}
            value={item}
            onChange={(event) => {
              updateUnit(unitIndex, propName, event.target.value, index);
            }}
          />
        ))}
      </Input.Group>
    );
  } else {
    children = (
      <Input
        placeholder={`请输入${label}`}
        value={unit.get(propName)}
        onChange={event => updateUnit(unitIndex, propName, event.target.value)}
      />
    );
  }
  return <Form.Item label={label}>{children}</Form.Item>;
};

export default PropComponet;
