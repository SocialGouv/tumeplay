import React from 'react';
import { Route } from 'react-router-dom';

const RoutesWithLayout = (props) => {
  const { layout: Layout, component: Component, exact, path } = props;

  return (
    <Route exact={exact} path={path}>
      <Layout>
        <Component layout={Layout} component={Component} />
      </Layout>
    </Route>
  );
};

export default RoutesWithLayout;
