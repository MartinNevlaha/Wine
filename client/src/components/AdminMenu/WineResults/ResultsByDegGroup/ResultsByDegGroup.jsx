import React, { Component } from "react";
import { connect } from "react-redux";

import * as action from "../../../../store/actions/index";
import ElementWrapper from "../../../../hoc/ElementWrapper/ElementWrapper";
import Back from "../../../UI/Back/Back";
import classes from "./ResultsByDegGroup.module.css";
import Button from "../../../UI/Button/Button";
import ResultsTable from "../ResultsTable/ResultsTable";
import Modal from "../../../UI/Modal/Modal";
import WineGlass from "../../../UI/WineGlass/WineGlass";
import ResumeTable from "../../../Rating/ResumeResults/ResumeTable/ResumeTable";
import Popup from "../../../UI/Popup/Popup";
import Spinner from "../../../UI/Spinner/Spinner";

class ResultsByDeGroup extends Component {
  state = {
    tableHeads: [
      "Číslo vína",
      "Názov vína",
      "Klasifikácia vína",
      "Výrobca vína",
      "Ročník vína",
      "Číslo degustátora",
      "Meno degustátora",
      "Víno eliminované",
      "Kategoria vína",
      "Bodové hodnotenie",
    ],
    isModalOpen: false,
    wineId: null,
    selectedGroup: null,
  };
  componentDidMount() {
    this.props.onFetchDegGroupsRes(this.props.token);
  }
  getGroupHandler = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let _id = el.getAttribute("id");
    this.setState({ selectedGroup: _id });
  };
  onClickHandler = (_id) => {
    this.setState({
      isModalOpen: true,
      wineId: _id,
    });
  };
  fetchResultByGroupHandler = () => {
    let selectedGroup;
    !this.state.selectedGroup
      ? (selectedGroup = this.props.degGroups[0]._id)
      : (selectedGroup = this.state.selectedGroup);
    this.props.onFetchResultsByGroup(selectedGroup, this.props.token);
  };
  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    let detailedData = {};
    if (this.state.wineId) {
      detailedData = this.props.results.filter(
        (result) => result._id === this.state.wineId
      );
    }
    return (
      <ElementWrapper wrapperType="ElementWrapper">
        <Modal
          show={this.state.isModalOpen}
          closeModal={this.closeModalHandler}
        >
          <h4>Detailné zobrazenie hodnotenia vína</h4>
          <WineGlass />
          {this.state.wineId && <ResumeTable data={detailedData[0]} />}
          <Button clicked={this.closeModalHandler}>Ok</Button>
        </Modal>
        <Back />
        <ElementWrapper wrapperType="FullWidthWrapper">
          <h4>Výsledky vo vybranej degustačnej skupine</h4>
          <div className={classes.HeaderGroupChoose}>
            <label>Degustačná skupina</label>
            <select onChange={this.getGroupHandler}>
              {this.props.degGroups.map((cat) => (
                <option key={cat._id} id={cat._id}>
                  {cat.groupName}
                </option>
              ))}
            </select>
            <Button clicked={this.fetchResultByGroupHandler}>Zobraz</Button>
          </div>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <div className={classes.ResultsByGroup_table}>
              <ResultsTable tableHeads={this.state.tableHeads}>
                {this.props.results.map((result, index) => {
                  return (
                    <tr
                      key={result._id}
                      onClick={() => this.onClickHandler(result._id)}
                    >
                      <td>{result.wineDbId.id}</td>
                      <td>{result.wineDbId.name}</td>
                      <td>
                        {`${result.wineDbId.color} 
                                ${result.wineDbId.character} 
                                ${result.wineDbId.clasification}`}
                      </td>
                      <td>{result.wineDbId.producer}</td>
                      <td>{result.wineDbId.vintage}</td>
                      <td>{result.degId.id}</td>
                      <td>{`${result.degId.name} ${result.degId.surname}`}</td>
                      <td>{result.eliminated ? "Áno" : "Nie"}</td>
                      <td>{result.wineCategory}</td>
                      <td>{result.totalSum}</td>
                    </tr>
                  );
                })}
              </ResultsTable>
            </div>
          )}
        </ElementWrapper>
        <Popup
          show={this.props.error}
          message={this.props.error && this.props.error.message}
        />
      </ElementWrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.adminAuth.token,
    degGroups: state.finalResults.degGroups,
    results: state.finalResults.resultsByGroup,
    error: state.finalResults.error,
    loading: state.finalResults.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDegGroupsRes: (token) => dispatch(action.fetchDegGroupsRes(token)),
    onFetchResultsByGroup: (groupId, token) =>
      dispatch(action.fetchResultsByGroup(groupId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultsByDeGroup);
