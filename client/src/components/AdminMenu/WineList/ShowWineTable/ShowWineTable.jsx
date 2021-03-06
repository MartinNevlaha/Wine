import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../../hoc/ElementWrapper/ElementWrapper";
import SearchBar from "../../../SearchBar/SearchBar";
import * as action from "../../../../store/actions/index";
import classes from "./ShowWineTable.module.css";
import { searchIdetificator, searchFilter } from "../../../../shared/utility";
import Back from "../../../UI/Back/Back";
import Spinner from "../../../UI/Spinner/Spinner";
import DownloadFile from "../../DownloadFile/DownloadFile";
import Popup from "../../../UI/Popup/Popup";

class ShowAddedWine extends Component {
  state = {
    tableHeadNames: [
      "Číslo vína",
      "Súťažná kategória",
      "Názov vína",
      "Klasifikácia vína",
      "Farba vína",
      "Charakter vína",
      "Výrobca vína",
      "Ročník vína",
    ],
    tableHeadIds: [
      "id",
      "competitiveCategory",
      "name",
      "clasification",
      "color",
      "character",
      "producer",
      "vintage",
    ],
    searchValue: "",
    headerValue: "Číslo vína",
    chossenHeaderId: "id",
    error: null,
  };
  componentDidMount() {
    this.props.onFetchWineList(this.props.token);
  }
  getSearchValueHandler = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  getHeaderValueHandler = (e) => {
    const [chossenHeader, chossenHeadId] = searchIdetificator(
      e,
      this.state.tableHeadNames,
      this.state.tableHeadIds
    );
    this.setState({
      headerValue: chossenHeader,
      chossenHeaderId: chossenHeadId,
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
          onClick={() =>
            this.props.onSortWineBy(this.state.tableHeadIds[index])
          }
        />
      </td>
    ));
    let filteredWineList = this.props.wineList;
    if (this.state.searchValue !== "" && filteredWineList) {
      filteredWineList = searchFilter(
        this.props.wineList,
        this.state.chossenHeaderId,
        this.state.searchValue
      );
    }
    let wineList = filteredWineList.map((wine) => (
      <tr key={wine._id}>
        <td>{wine.id}</td>
        <td>{wine.competitiveCategory}</td>
        <td>{wine.name}</td>
        <td>{wine.clasification}</td>
        <td>{wine.color}</td>
        <td>{wine.character}</td>
        <td>{wine.producer}</td>
        <td>{wine.vintage}</td>
      </tr>
    ));
    let content = (
      <React.Fragment>
        {this.props.wineList.length ? (
          <ElementWrapper wrapperType="FullWidthWrapper">
            <h4>Zoznam súťažných vin</h4>
            <SearchBar
              searchValue={this.state.searchValue}
              getSearchValue={this.getSearchValueHandler}
              headerValue={this.state.headerValue}
              getHeadValue={this.getHeaderValueHandler}
              options={this.state.tableHeadNames}
            />
            <div className={classes.WineList_table_container}>
              <table className={classes.ShowWineTable}>
                <thead>
                  <tr>{tableHead}</tr>
                </thead>
                <tbody>{wineList}</tbody>
              </table>
            </div>
            <div className={classes.Winelist_download}>
              <DownloadFile
                token={this.props.token}
                endPoint="wine-list/export"
                fileName="WineList.xlsx"
                errorDownload={this.errorHandler}
              >
                Stiahni zoznam
              </DownloadFile>
            </div>
          </ElementWrapper>
        ) : (
          <h4>Nebolo pridané žiadne víno</h4>
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
    wineList: state.wineList.wine,
    token: state.adminAuth.token,
    loading: state.wineList.loading,
    error: state.wineList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSortWineBy: (sortByProp) => dispatch(action.sortWineBy(sortByProp)),
    onFetchWineList: (token) => dispatch(action.fetchWineList(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowAddedWine);
