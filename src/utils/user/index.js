/* eslint-disable no-unused-vars */
import { request } from 'utils/request';
import React from 'react';
import Loadable from 'react-loadable';
import { Instagram } from 'react-content-loader';
import { getToken } from 'utils/token';

export const User = {
  userData: undefined,
  promise: undefined,
  url: '/api/user',
  get: function(force = false, options = {}) {
    if (!force && this.promise) {
      return this.promise;
    }
    force && (this.promise = undefined);
    if (!this.promise) {
      this.promise = request
        .get({
          url: this.url,
          options: {
            report: true,
            unloginOpen: false,
            ...options
          }
        })
        .then((data = {}) => this.onSuccess(data))
        .catch((res) => {
          this.reset();
          throw res;
        });
    }
    return this.promise;
  },
  getSync: function() {
    return this.userData;
  },
  onSuccess: function(data) {
    this.userData = this._formate(data);
    window.__isLogin = true;
    return data;
  },
  _formate: function(data) {
    const { authority = [] } = data;
    this.authorityMap = {};
    authority.forEach((author) => {
      this.authorityMap[`${author}`] = true;
    });
    return data;
  },
  reset: function() {
    this.userData = undefined;
    window.__isLogin = false;
  },
  isLogin: function() {
    // 只能证明用户在某段时间登陆成功过
    return !!window.__isLogin && getToken();
  },
  isAuthority: function(authority = [], strict = true) {
    if (!this.authorityMap) {
      return !strict;
    }
    const { authorityMap = {} } = this;
    const allowAuthors = [];
    for (let i = authority.length - 1; i >= 0; i--) {
      let auth = `${authority[i]}`;
      if (auth.startsWith('!')) {
        auth = auth.slice(1);
        if (authorityMap[`${auth}`]) {
          return false;
        }
      } else {
        allowAuthors.push(auth);
      }
    }
    for (let j = allowAuthors.length - 1; j >= 0; j--) {
      const auth = `${allowAuthors[j]}`;
      if (authorityMap[auth]) {
        return true;
      }
    }
    return !strict;
  },
  logout: function() {
    window.location.href = '/logout';
  }
};

export const UserLoadableComponent = Loadable({
  loader: () => User.get(),
  loading: (props) => {
    if (props.error) {
      return <div>{props.error.toString()}</div>;
    } else if (props.pastDelay) {
      return <Instagram />;
    } else {
      return null;
    }
  },
  render: (data, props) => props.render(data)
});
