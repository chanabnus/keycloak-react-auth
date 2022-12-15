import React, { Component } from "react";
import Keycloak from "keycloak-js";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = new Keycloak('/keycloak.json');

    // const keycloak = new Keycloak({
    //   "realm": "keycloak-auth",
    //   "clientId": "keycloak-auth-client",
    //   "url": "https://9.178.216.221:8443/auth/",
    //   "auth-server-url": "https://9.178.216.221:8443/auth/",
    //   "ssl-required": "external",
    //   "resource": "keycloak-auth-client",
    //   "public-client": true,
    //   "confidential-port": 0
    // });

    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });
      });
  }
  // FOR REFERENCE ONLY: keycloak url
  // http://localhost:8080/auth/
  // https://localhost:8443/auth/

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <div>
            <hr/>
            <p>
              Autenticate Success!
              <br/>This is a Keycloak-secured component of your application.
              <br/>You shouldn't be able to see this unless you've 
              authenticated with Keycloak.
            </p>
          </div>
        );
      else return <div><p>Autenticate Fails!!</p>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}

export default Secured;
