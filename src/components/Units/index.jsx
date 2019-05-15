import React from 'react';
import UnitPanel from 'components/Layout/UnitPanel';

import './index.less';

const UnitComponentMap = {
  META: require('./MetaUnit').default,
  TITLE: require('./TitleUnit').default,
  IMAGE: require('./ImageUnit').default,
  JAVACRIPT: require('./JavascriptUnit').default,
  CSS: require('./CssUnit').default,
  HTML: require('./HtmlUnit').default,
  MARKDOWN: require('./MarkdownUnit').default
};

const UnitFactory = ({ unit, unitIndex }) => {
  const unitType = unit.get('unitType');
  const Component = UnitComponentMap[unitType];
  if (Component) {
    return (
      <UnitPanel unit={unit} unitIndex={unitIndex}>
        <Component unit={unit} unitIndex={unitIndex} />
      </UnitPanel>
    );
  } else {
    return null;
  }
};

export default UnitFactory;
