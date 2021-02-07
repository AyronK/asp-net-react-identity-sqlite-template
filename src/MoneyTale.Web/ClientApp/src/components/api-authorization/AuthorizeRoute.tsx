import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  ApplicationPaths,
  QueryParameterNames,
} from "./ApiAuthorizationConstants";
import authService from "./AuthorizeService";

export interface AuthorizeRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

interface AuthorizeRouteState {
  ready: boolean;
  authenticated: boolean;
}

export default class AuthorizeRoute extends Component<
  AuthorizeRouteProps,
  AuthorizeRouteState
> {
  private subscription: number | undefined;

  constructor(props: Readonly<AuthorizeRouteProps>) {
    super(props);

    this.state = {
      ready: false,
      authenticated: false,
    };
  }

  componentDidMount() {
    this.subscription = authService.subscribe(() =>
      this.authenticationChanged(),
    );
    this.populateAuthenticationState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this.subscription);
  }

  async populateAuthenticationState() {
    const authenticated = await authService.isAuthenticated();
    this.setState({ ready: true, authenticated });
  }

  async authenticationChanged() {
    this.setState({ ready: false, authenticated: false });
    await this.populateAuthenticationState();
  }

  render() {
    const { ready, authenticated } = this.state;
    const link = document.createElement("a");
    link.href = this.props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${
      QueryParameterNames.ReturnUrl
    }=${encodeURIComponent(returnUrl)}`;

    if (!ready) {
      return <div />;
    }

    const { component: InnerComponent, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (authenticated) {
            return <InnerComponent {...props} />;
          }
          return <Redirect to={redirectUrl} />;
        }}
      />
    );
  }
}
