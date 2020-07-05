import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

const AdminLayout = loadable(() => import(/* webpackChunkName: "adminLayout" */'../pages/layout/admin'));
const DetailLayout = loadable(() => import(/* webpackChunkName: "detailLayout" */'../pages/layout/detail'));
const Home = loadable(() => import(/* webpackChunkName: "home" */'../pages/home'));
const App = loadable(() => import(/* webpackChunkName: "app" */'../App'));
const SearchForm = loadable(() => import(/* webpackChunkName: "searchForm" */'../pages/search-form'));
const ImageCompress = loadable(() => import(/* webpackChunkName: "imageCompress" */'../pages/image-compress'));
const PullRefresh = loadable(() => import(/* webpackChunkName: "pullRefresh" */'../pages/pull-refresh'));

class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route
              path="/detail"
              render={() => (
                <DetailLayout>
                  <Switch>
                    {/* <Route path="/detail/order/detail" component={Login} /> */}
                  </Switch>
                </DetailLayout>
              )}
            />
            <Route
              path="/"
              render={() => (
                <AdminLayout>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/components/search-form" component={SearchForm} />
                    <Route path="/components/image-compress" component={ImageCompress} />
                    <Route path="/components/pull-refresh" component={PullRefresh} />
                    <Redirect to="/home" />
                    {/* <Route component={NotFound} /> */}
                  </Switch>
                </AdminLayout>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter;
