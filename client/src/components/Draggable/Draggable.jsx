import React, { Component } from 'react';

class Draggable extends Component {

    dragHandler = (e, dragTarget) => {
        e.dataTransfer.setData('transfer', e.target.id);
        this.props.dragDegHandler(dragTarget);
    } 

    notAllowDrop = (e) => {
        e.stopPropagation();
    }

    render() {
        return (
            <div
            id={this.props.id}
            draggable='true' 
            onDragStart={(e) => this.dragHandler(e, this.props.dragTarget)}
            onDragOver={this.notAllowDrop}>
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;