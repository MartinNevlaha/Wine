import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ShowDegGroups.module.css";
import ElementWrapper from "../../../../hoc/ElementWrapper/ElementWrapper";
import DegGroupsTable from "./DegGroupsTable/DegGroupsTable";
import Back from "../../../UI/Back/Back";
import * as action from "../../../../store/actions/index";
import Popup from "../../../UI/Popup/Popup";
import Spinner from "../../../UI/Spinner/Spinner";
import DownloadFile from "../../DownloadFile/DownloadFile";

class ShowDegGroups extends Component {
  state = {
    error: null,
  };
  componentDidMount() {
    this.props.onFetchDegGroups(this.props.token);
  }
  errorHandler = (err) => {
    this.setState({ error: err });
    this.clearError();
  };
  clearError = () => {
    setTimeout(() => {
      this.setState({ error: null });
    }, 2500);
  };

  render() {
    let message;
    if (this.state.error) {
      message = this.state.error.message;
    } else if (this.props.error) {
      message = this.props.error.message;
    }
    const groups = this.props.groups.map((gr, index) => (
      <DegGroupsTable key={index} group={gr} />
    ));
    let content = (
      <React.Fragment>
        <ElementWrapper wrapperType="FullWidthWrapper">
          <h4>Skupiny degustátorov</h4>
          <div className={classes.ShowDegGroups_table_container}>{groups}</div>
          <div className={classes.ShowDegGroups_download}>
            <DownloadFile
              token={this.props.token}
              endPoint="degustator-export-groups"
              fileName="DegGroups.pdf"
              errorDownload={this.errorHandler}
            >
              Stiahni zoznam
            </DownloadFile>
          </div>
        </ElementWrapper>
        <Back />
        <Popup show={this.state.error || this.props.error} message={message} />
      </React.Fragment>
    );
    if (this.props.loading) {
      content = <Spinner />;
    }
    return (
      <ElementWrapper wrapperType="ElementWrapper">{content}</ElementWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.adminAuth.token,
    groups: state.degGroups.degGroups,
    error: state.degGroups.error,
    loading: state.degGroups.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDegGroups: (token) => dispatch(action.fetchDegGroups(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDegGroups);
