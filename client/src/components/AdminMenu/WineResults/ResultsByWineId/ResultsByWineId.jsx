import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ElementWrapper from "../../../../hoc/ElementWrapper/ElementWrapper";
import * as action from "../../../../store/actions/index";
import WineInfo from "../WineInfo/WineInfo";
import ResultsTable from "../ResultsTable/ResultsTable";
import Modal from "../../../UI/Modal/Modal";
import ResumeTable from "../../../Rating/ResumeResults/ResumeTable/ResumeTable";
import WineGlass from "../../../UI/WineGlass/WineGlass";
import Button from "../../../UI/Button/Button";
import Back from "../../../UI/Back/Back";
import Popup from "../../../UI/Popup/Popup";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./ResultsByWineId.module.css";

class ResultsByWineId extends Component {
  state = {
    tableHeads: [
      "Číslo degustátora",
      "Meno degustátora",
      "Víno eliminované",
      "Kategoria vína",
      "Bodové hodnotenie",
    ],
    isModalOpen: false,
    wineId: null,
  };
  componentDidMount() {
    const wineId = this.props.match.params.wineId;
    this.props.onfetchResultsByWineId(wineId, this.props.token);
  }
  onClickHandler = (_id) => {
    this.setState({
      isModalOpen: true,
      wineId: _id,
    });
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
          <h4>Súhrn výsledkov</h4>
          <WineInfo
            token={this.props.token}
            wineInfo={this.props.wineInfo}
          />
          {this.props.loading ? (
            <Spinner />
          ) : (
            <div className={classes.Results_Table}>
              <ResultsTable tableHeads={this.state.tableHeads}>
                {this.props.results.map((result, index) => {
                  return (
                    <tr
                      key={result._id}
                      onClick={() => this.onClickHandler(result._id)}
                    >
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
    results: state.finalResults.resultByWineId || [],
    wineInfo: state.finalResults.wineInfo || [],
    error: state.finalResults.error,
    loading: state.finalResults.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onfetchResultsByWineId: (wineId, token) =>
      dispatch(action.fetchResultsByWineId(wineId, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResultsByWineId));
