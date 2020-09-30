import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

class Layout extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar isAdminAuth={this.props.isAdminAuth}/>
                <main className={this.props.location.pathname === "/rating" ? classes.BackgroundDeg : classes.BackgroundApp }>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAdminAuth: state.adminAuth.token !== null && state.adminAuth.isValid
    }
}

export default connect(mapStateToProps)(withRouter(Layout));