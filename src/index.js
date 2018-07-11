import Style from './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Store from './store';
import Index from '@routes/Index.js';
import Logs from '@routes/Logs.js';
import Exception from '@routes/Exception.js';

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Switch>
        <Route exact path="/pagemaker/" component={Index} />
        <Route exact path="/pagemaker/logs/" component={Logs} />
        <Route component={Exception} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
