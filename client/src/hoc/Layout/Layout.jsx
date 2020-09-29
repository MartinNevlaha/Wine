import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

class Layout extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className={this.props.location.pathname === "/rating" ? classes.BackgroundDeg : classes.BackgroundApp }>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default withRouter(Layout);