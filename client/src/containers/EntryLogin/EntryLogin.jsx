import React, { Component } from "react";

import LoginForm from "../../components/Login/LoginForm";
import EntryContent from "../../components/EntryContent/EntryContent";

class EntryLogin extends Component {
  state = {
    loginShow: false,
  };
  togleLogin = () => {
    this.setState({ loginShow: true });
  };
  render() {
    return (
      <div>
        {this.state.loginShow ? (
          <LoginForm />
        ) : (
          <EntryContent toggleLoginHandler={this.togleLogin} />
        )}
      </div>
    );
  }
}

export default EntryLogin;
