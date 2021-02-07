import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";

const App = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <AuthorizeRoute path="/fetch-data" component={FetchData} />
    <Route
      path={ApplicationPaths.ApiAuthorizationPrefix}
      component={ApiAuthorizationRoutes}
    />
  </Layout>
);

App.displayName = App.name;

export default App;
