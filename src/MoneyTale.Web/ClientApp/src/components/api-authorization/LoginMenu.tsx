import { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";

interface LoginMenuState {
  userName: string | null;
  isAuthenticated: boolean;
}

class LoginMenu extends Component<{}, LoginMenuState> {
  private subscription: number | undefined;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
    };
  }

  componentDidMount() {
    this.subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this.subscription);
  }

  anonymousView = (registerPath: string, loginPath: string) => (
    <>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={registerPath}>
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={loginPath}>
          Login
        </NavLink>
      </NavItem>
    </>
  );

  authenticatedView = (
    userName: string | null,
    profilePath: string,
    logoutPath: any,
  ) => (
    <>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={profilePath}>
          Hello {userName}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={logoutPath}>
          Logout
        </NavLink>
      </NavItem>
    </>
  );

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    }
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = {
      pathname: `${ApplicationPaths.LogOut}`,
      state: { local: true },
    };
    return this.authenticatedView(userName, profilePath, logoutPath);
  }
}

export default LoginMenu;
