import React, { Component } from 'react';

import classes from './Droppable.module.css';

class Droppable extends Component {

    drop = (e, id) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        this.props.dropHandler(data, id);
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div 
            className={classes.Droppable}
            onDrop={e=>{this.drop(e, this.props.id)}}
            onDragOver={this.allowDrop}>
                {this.props.children}
            </div>
        )
    }
}

export default Droppable;