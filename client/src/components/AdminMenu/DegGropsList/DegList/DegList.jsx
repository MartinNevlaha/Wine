import React, { Component } from 'react';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import classes from './DegList.module.css';
import Draggable from '../../../Draggable/Draggable';

class DegList extends Component {
    render() {
        const degList = this.props.degList.map(deg => {
            return (
                <Draggable 
                dragTarget="degList"
                dragDegHandler={this.props.dragDegHandler}
                key={deg._id}
                id={deg._id}>
                    <p>{`${deg.id} ${deg.name} ${deg.surname}`}</p>
                </Draggable>
            );
        })
        return (
            <ElementWrapper wrapperType="DraggableWrapper">
                <h4>Zoznam Degustorov</h4>
                <div className={classes.DegList}>
                    {degList}
                </div>
            </ElementWrapper>
        );
    }
}

export default DegList; 
