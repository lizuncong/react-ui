import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

const AdminLayout = loadable(() => import(/* webpackChunkName: "adminLayout" */'../pages/layout/admin'));
const Home = loadable(() => import(/* webpackChunkName: "home" */'../pages/home'));
const App = loadable(() => import(/* webpackChunkName: "app" */'../App'));
const SearchForm = loadable(() => import(/* webpackChunkName: "searchForm" */'../pages/search-form'));
const ImageCompress = loadable(() => import(/* webpackChunkName: "imageCompress" */'../pages/image-compress'));
const PullRefresh = loadable(() => import(/* webpackChunkName: "pullRefresh" */'../pages/pull-refresh'));
const Spin = loadable(() => import(/* webpackChunkName: "spin" */'../pages/spin'));
const VirtualScroll = loadable(() => import(/* webpackChunkName: "virtual-scroll" */'../pages/virtual-scroll'));
const TransFormTable = loadable(() => import(/* webpackChunkName: "transform-table" */'../pages/transform-table'));

class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route
              path="/"
              render={() => (
                <AdminLayout>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/components/search-form" component={SearchForm} />
                    <Route path="/components/image-compress" component={ImageCompress} />
                    <Route path="/components/pull-refresh" component={PullRefresh} />
                    <Route path="/components/spin" component={Spin} />
                    <Route path="/components/virtual-scroll" component={VirtualScroll} />
                    <Route path="/components/transform-table" component={TransFormTable} />
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
