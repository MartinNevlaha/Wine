import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import classes from './ResultsTable.module.css';
import Checkbox from '../Checkbox/Checkbox';
import DegComment from '../DegComment/DegComment';
import Button from '../../UI/Button/Button';
import ResultsValidator from '../ResultsValidator/ResultsValidator';
import * as action from '../../../store/actions/index';
import {isRatingValid} from '../../../shared/validations';

class ResultsTable extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }
    get initialState() {
        return {
            resultsComment: ''
        }
    }
    componentDidUpdate(nextProps) {
        if (this.props.isSucces !== nextProps.isSucces) {
            this.setState(this.initialState)
        }
    }

    getCommentHandler = (e) => {
        this.setState({resultsComment: e.target.value});
    };
    submitComment = () => {
        this.props.modalToogle();
        this.props.onSubmitComment(this.state.resultsComment);
    }

    render() {
        let defaultSumValue = 'Nehodnotené';
        let defaultWineCategory = 'Nepriradená';
        if (this.props.totalSum) {
            defaultSumValue = this.props.totalSum;
        } 
        if (this.props.wineCategory) {
            defaultWineCategory = this.props.wineCategory;
        }
        return (
            <div className={classes.ResultsTable}>
            <h2>Priebežný výsledok</h2>
            <p>Skupina: <span style={{fontWeight:"bold"}}>{this.props.degInfo.group}</span></p>
            <p>Číslo degustátora: <span style={{fontWeight:"bold"}}>{this.props.degInfo.degustatorNumber}</span></p>
            <Checkbox 
            checked={this.props.eliminated}
            change={this.props.onEliminate}/>
            <p>Kategória vína: <span style={{fontWeight:"bold"}}>{this.props.eliminated ? 'Eliminované' : defaultWineCategory}</span></p>
            <p>Celkom bodov: <span style={{fontWeight:"bold"}}>{this.props.eliminated ? 'Eliminované' : defaultSumValue}</span></p>
            <DegComment getComment={this.getCommentHandler} value={this.state.resultsComment}/>
            <ResultsValidator 
            isRatingValid={isRatingValid(this.props.results, this.props.eliminated)}
            isWineIdValid={this.props.isWineIdValid && !this.props.idError}
            />
            <Button 
            clicked = {this.submitComment}
            disabled={!(this.props.isWineIdValid && !this.props.idError) || !isRatingValid(this.props.results, this.props.eliminated)}>Odoslať</Button>
        </div>
        );
    }    
};

const mapStateToProps = state => {
    return {
        eliminated: state.degRating.eliminated,
        results: state.degRating.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEliminate: (actualStatus) => dispatch(action.getEliminatedStatus(actualStatus)),
        onSubmitComment: (comment) => dispatch(action.getComment(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);