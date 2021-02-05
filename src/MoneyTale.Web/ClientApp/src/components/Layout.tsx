import React, { FunctionComponent } from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

const Layout: FunctionComponent<any> = ({ children }: any) => (
  <div>
    <NavMenu />
    <Container>{children}</Container>
  </div>
);

Layout.displayName = Layout.name;

export default Layout;
