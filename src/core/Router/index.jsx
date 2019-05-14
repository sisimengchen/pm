/* eslint-disable no-unused-vars */
/**
 * @file 路由组件
 * @author mengchen <sisimengchen@gmail.com>
 */
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'core/history';
import routes from 'core/routes';

import AuthorizedRoute from './AuthorizedRoute';

const CoreRouter = () => (
  <Router history={history}>
    <Switch>
      {routes.map((route = {}, index) => {
        console.log(route);
        return <AuthorizedRoute key={index} exact {...route} />;
      })}
    </Switch>
  </Router>
);

export default CoreRouter;
