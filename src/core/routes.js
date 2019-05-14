/* eslint-disable no-unused-vars */
import React from 'react';
import Loadable from 'react-loadable';
import { Instagram } from 'react-content-loader';

const getComponent = loader => ({
  loader: loader,
  loading: Instagram
});

const routes = [
  {
    path: '/',
    title: '首页',
    component: Loadable(getComponent(() => import(/* webpackChunkName: "HomePage" */ 'pages/Home')))
  },
  {
    path: '/forbidden',
    title: '禁止访问',
    component: require('core/Error/403').default
  },
  {
    path: '*',
    title: '抱歉，您访问的页面不存在！',
    component: require('core/Error/404').default
  }
];

export default routes;
