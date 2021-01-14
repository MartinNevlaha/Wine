import React, { Component } from "react";
import { connect } from "react-redux";

import LoginForm from "../../components/Login/LoginForm";
import EntryContent from "../../components/EntryContent/EntryContent";
import Popup from "../../components/UI/Popup/Popup";

class EntryLogin extends Component {
  state = {
    loginShow: false,
  };
  togleLogin = () => {
    this.setState({ loginShow: true });
  };
  render() {
    let message;
    if (this.props.degAuthError) {
      message = this.props.degAuthError.message;
    } else if (this.props.adminAuthError) {
      message = this.props.adminAuthError.message;
    }
    return (
      <React.Fragment>
        {this.state.loginShow ? (
          <LoginForm />
        ) : (
          <EntryContent toggleLoginHandler={this.togleLogin} />
        )}
        <Popup
          show={this.props.degAuthError || this.props.adminAuthError}
          message={
            (this.props.degAuthError || this.props.adminAuthError) && message
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    degAuthError: state.degAuth.error,
    adminAuthError: state.adminAuth.error,
  };
};

export default connect(mapStateToProps, null)(EntryLogin);
