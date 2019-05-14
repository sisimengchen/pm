/* eslint-disable no-unused-vars */
/**
 * @file 用户权限校验路由组件
 * @author mengchen <sisimengchen@gmail.com>
 * @module components/Authorized/AuthorizedRoute
 */
import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import { User, UserLoadableComponent } from 'utils/user';

const AuthorizedRoute = ({
  layout: Layout = Fragment,
  component: Component,
  authority = [],
  title,
  location = {},
  ...rest
}) => {
  location.query = location.search ? queryString.parse(location.search) : {};
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location = {} } = props;
        const { pathname = '/' } = location;
        // /sign/ 下的所有页面需要做登录判断， 其他的不用
        const isSignPage = pathname.indexOf('/sign/') === 0;
        if (!isSignPage) {
          return (
            <Fragment>
              {title && <DocumentTitle title={title} />}
              <Layout title={title}>
                <Component {...props} />
              </Layout>
            </Fragment>
          );
        }
        return (
          <Fragment>
            {title && <DocumentTitle title={title} />}
            <UserLoadableComponent
              render={(data) => {
                if (!User.isLogin()) {
                  // 判断登录
                  return (
                    <Redirect
                      to={{
                        pathname: '/signin',
                        search: `?continue=${encodeURIComponent(window.location.href)}`
                      }}
                    />
                  );
                } else if (!User.isAuthority(authority)) {
                  // 判断权限
                  return (
                    <Redirect
                      to={{
                        pathname: '/forbidden'
                      }}
                    />
                  );
                }
                return (
                  <Layout title={title}>
                    <Component {...props} />
                  </Layout>
                );
              }}
            />
          </Fragment>
        );
      }}
    />
  );
};

export default AuthorizedRoute;
