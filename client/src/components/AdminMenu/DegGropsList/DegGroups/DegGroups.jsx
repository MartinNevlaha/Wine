import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowAltCircleDown,
    faArrowAltCircleUp
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import classes from './DegGroups.module.css';
import Droppable from '../../../Droppable/Droppable';
import Draggable from '../../../Draggable/Draggable';

class DegGroups extends Component {

    render() {
        let groups = this.props.groupsList.map(group => {
            return (
                <ElementWrapper 
                wrapperType="SmallWrapper" 
                key={group.groupName}>
                    <div className={classes.GroupHeader}>
                    <h3>Skupina {group.groupName}</h3>
                    <FontAwesomeIcon 
                    icon={group.isMinimalised ? faArrowAltCircleDown 
                        : faArrowAltCircleUp}
                    size="2x"
                    style={{padding: 15}}
                    cursor="pointer"
                    onClick={() => this.props.minimalisedHandler(group.index)}
                    data-tip data-for="tooltipDataMinimalised"
                    />
                    <ReactTooltip 
                    id="tooltipDataMinimalised" 
                    place="top" 
                    effect="solid" 
                    backgroundColor="rgba(102, 101, 101, 0.651)" 
                    border={true}
                    borderColor="white">
                        Klinki pre zbalenie/rozbalenie
                    </ReactTooltip>
                    </div>
                    {group.isMinimalised ? null : 

                    <Droppable 
                    dropHandler={this.props.dropHandler}
                    id={group.index}>
                        <p>Pridaj degustátora potiahnutím zo zoznamu degustátorov</p> 
                        <div className={classes.DegGroups}>
                            {group.items.map(item => {
                                return (
                                    <Draggable 
                                    index ={group.index}
                                    key={item._id}
                                    id={item._id}
                                    dragTarget={group.index}
                                    dragDegHandler={this.props.dragDegHandler}>
                                        <p>{`${item.id} ${item.name} ${item.surname}`}</p>
                                    </Draggable>
                                )
                            })}
                        </div>
                    </Droppable>}
                </ElementWrapper>
            );
        })
        return (
            <ElementWrapper wrapperType="GroupWrapper">
                {groups}
            </ElementWrapper>
        );
    }
}

export default DegGroups;