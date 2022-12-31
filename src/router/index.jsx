import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const AdminLayout = loadable(() =>
  import(/* webpackChunkName: "adminLayout" */ "../pages/layout/admin")
);
const Home = loadable(() =>
  import(/* webpackChunkName: "home" */ "../pages/home")
);
const App = loadable(() => import(/* webpackChunkName: "app" */ "../App"));
const SearchForm = loadable(() =>
  import(/* webpackChunkName: "searchForm" */ "../pages/search-form")
);
const RepeatRequest = loadable(() =>
  import(/* webpackChunkName: "RepeatRequest" */ "../pages/repeat-request")
);
const ImageCompress = loadable(() =>
  import(/* webpackChunkName: "imageCompress" */ "../pages/image-compress")
);
const PullRefresh = loadable(() =>
  import(/* webpackChunkName: "pullRefresh" */ "../pages/pull-refresh")
);
const Spin = loadable(() =>
  import(/* webpackChunkName: "spin" */ "../pages/spin")
);
const VirtualScroll = loadable(() =>
  import(/* webpackChunkName: "virtual-scroll" */ "../pages/virtual-scroll")
);
const TransFormTable = loadable(() =>
  import(/* webpackChunkName: "transform-table" */ "../pages/transform-table")
);
const Collapse = loadable(() =>
  import(/* webpackChunkName: "collapse" */ "../pages/collapse")
);
const Demo = loadable(() =>
  import(/* webpackChunkName: "demo" */ "../pages/demo")
);
const LessDemo = loadable(() =>
  import(/* webpackChunkName: "lessDemo" */ "../pages/less-demo")
);
const Image = loadable(() =>
  import(/* webpackChunkName: "Image" */ "../pages/image")
);
const Ellipse = loadable(() =>
  import(/* webpackChunkName: "Image" */ "../pages/ellipse")
);
const ArticlePage = loadable(() =>
  import(/* webpackChunkName: "ArticlePage" */ "../pages/article-pagination")
);
const RequestLoading = loadable(() =>
  import(/* webpackChunkName: "RequestLoading" */ "../pages/request-loading")
);
const Test = loadable(() =>
  import(/* webpackChunkName: "Test" */ "../pages/test")
);
const WindowOpen = loadable(() =>
  import(/* webpackChunkName: "Test" */ "../pages/window-open")
);

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
                    <Route path="/components/demo" component={Demo} />
                    <Route path="/components/less" component={LessDemo} />
                    <Route
                      path="/components/search-form"
                      component={SearchForm}
                    />
                    <Route
                      path="/components/window-open"
                      component={WindowOpen}
                    />
                    <Route
                      path="/components/repeat-request"
                      component={RepeatRequest}
                    />
                    <Route
                      path="/components/request-loading"
                      component={RequestLoading}
                    />
                    <Route
                      path="/components/image-compress"
                      component={ImageCompress}
                    />
                    <Route
                      path="/components/pull-refresh"
                      component={PullRefresh}
                    />
                    <Route path="/components/spin" component={Spin} />
                    <Route
                      path="/components/virtual-scroll"
                      component={VirtualScroll}
                    />
                    <Route
                      path="/components/transform-table"
                      component={TransFormTable}
                    />
                    <Route path="/components/collapse" component={Collapse} />
                    <Route path="/components/image" component={Image} />
                    <Route path="/components/ellipse" component={Ellipse} />
                    <Route
                      path="/components/article-pagination"
                      component={ArticlePage}
                    />
                    <Route path="/components/test" component={Test} />
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
