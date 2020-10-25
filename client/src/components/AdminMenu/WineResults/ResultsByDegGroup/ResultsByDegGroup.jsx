import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';
import classes from './ResultsByDegGroup.module.css';
import Button from '../../../UI/Button/Button';
import ResultsTable from '../ResultsByCategory/CategoryTable/CategoryTable';
import Modal from '../../../UI/Modal/Modal';
import WineGlass from '../../../UI/WineGlass/WineGlass';
import ResumeTable from '../../../Rating/ResumeResults/ResumeTable/ResumeTable';

class ResultsByDeGroup extends Component {
    state = {
        tableHeadNames: ['Poradie'],
        tableHeads: ['Číslo degustátora','Meno degustátora', "Víno eliminované", 'Kategoria vína', 'Bodové hodnotenie' ],
        isModalOpen: false,
        wineId: null
    }
    componentDidMount() {
        this.props.onFetchDegGroupsRes(this.props.token)
    }

    onClickHandler = (_id) => {
        this.setState({
            isModalOpen: true,
            wineId: _id
        })
    }
    closeModalHandler = () => {
        this.setState({isModalOpen: false})
    }
    render() {
        let detailedData = {}
        if (this.state.wineId) {
            detailedData = this.props.results.filter(result => 
                result._id === this.state.wineId
            )
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
            <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Výsledky vo vybranej degustačnej skupine</h4>
                    <div className={classes.HeaderGroupChoose}>
                            <label >Súťažná kategória vína</label>
                            <select
                            onChange={this.getCategoryHandler}>
                            {this.props.degGroups.map(cat => (
                            <option 
                                key={cat._id}
                                id={cat._id}>
                                {cat.groupName}
                            </option>
                        ))}
                            </select>
                        <Button clicked={this.fetchResultsByComCategory}>Zobraz</Button>
                    </div>
                </ElementWrapper>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        degGroups: state.finalResults.degGroups,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchDegGroupsRes: (token) => dispatch(action.fetchDegGroupsRes(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResultsByDeGroup));;