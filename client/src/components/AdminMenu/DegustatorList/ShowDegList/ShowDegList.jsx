import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../../hoc/ElementWrapper/ElementWrapper";
import SearchBar from "../../../SearchBar/SearchBar";
import * as action from "../../../../store/actions/index";
import classes from "./ShowDegList.module.css";
import Back from "../../../UI/Back/Back";
import { searchIdetificator, searchFilter } from "../../../../shared/utility";
import Spinner from "../../../UI/Spinner/Spinner";
import DownloadFile from "../../DownloadFile/DownloadFile";
import Popup from "../../../UI/Popup/Popup";

class ShowDegList extends Component {
  state = {
    tableHeadNames: ["Čílo degustátora", "Meno", "Priezvysko"],
    tableHeadsId: ["id", "name", "surname"],
    searchValue: "",
    headerValue: "Čílo degustátora",
    choosenHeaderId: "id",
    error: null,
  };
  componentDidMount() {
    this.props.onFetchDegList(this.props.token);
  }

  getSearchValueHandler = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  getHeaderValueHandler = (e) => {
    const [choosenHeader, choosenHeadId] = searchIdetificator(
      e,
      this.state.tableHeadNames,
      this.state.tableHeadsId
    );
    this.setState({
      headerValue: choosenHeader,
      choosenHeaderId: choosenHeadId,
    });
  };
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
    let tableHead = this.state.tableHeadNames.map((th, index) => (
      <td key={th}>
        <span>{th}</span>
        <FontAwesomeIcon
          icon={faSort}
          cursor="pointer"
          onClick={() => this.props.onSortDegBy(this.state.tableHeadsId[index])}
        />
      </td>
    ));
    let filteredDegList = this.props.degList;
    if (this.state.searchValue !== "" && filteredDegList) {
      filteredDegList = searchFilter(
        this.props.degList,
        this.state.choosenHeaderId,
        this.state.searchValue
      );
    }
    let degList = filteredDegList.map((deg) => (
      <tr key={deg._id}>
        <td>{deg.id}</td>
        <td>{deg.name}</td>
        <td>{deg.surname}</td>
      </tr>
    ));
    let content = (
      <React.Fragment>
        {degList.length ? (
          <ElementWrapper wrapperType="FullWidthWrapper">
            <h4>Zoznam degustátorov</h4>
            <SearchBar
              searchValue={this.state.searchValue}
              getSearchValue={this.getSearchValueHandler}
              headerValue={this.state.headerValue}
              getHeadValue={this.getHeaderValueHandler}
              options={this.state.tableHeadNames}
            />
            <div className={classes.ShowDegList_table_container}>
              <table className={classes.ShowDegList}>
                <thead>
                  <tr>{tableHead}</tr>
                </thead>
                <tbody>{degList}</tbody>
              </table>
            </div>
            <div className={classes.ShowDegList_download}>
              <DownloadFile
                token={this.props.token}
                endPoint="degustator-export-card"
                fileName="DegCards.pdf"
                errorDownload={this.errorHandler}
              >
                Stiahni zoznam
              </DownloadFile>
            </div>
          </ElementWrapper>
        ) : (
          <h3>Nebol pridaný žiadny degustátor</h3>
        )}
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
    degList: state.degList.degustators,
    token: state.adminAuth.token,
    loading: state.degList.loading,
    error: state.degList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSortDegBy: (sortByProp) => dispatch(action.sortDegBy(sortByProp)),
    onFetchDegList: (token) => dispatch(action.fetchDegList(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDegList);
