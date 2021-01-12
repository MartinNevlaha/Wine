import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import ErrorBoudary from '../../components/ErrorBoundary/ErrorBoundary'; 
import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

class Layout extends Component {
    state = {
        windowWidth: window.innerWidth,
        errorBoudary: null
    }
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler)
    }
    resizeHandler = (e) => {
        this.setState({windowWidth: window.innerWidth});
    }
    render() {
        return (
            <ErrorBoudary>
                <main className={classes.BackgroundApp}>
                {this.state.windowWidth >= 700 && <NavBar isAdminAuth={this.props.isAdminAuth} isDegAuth={this.props.isDegAuth}/>}
                    {this.state.windowWidth >= 700 ? this.props.children : <h2>Táto aplikácia nie je dimenzovaná pre toto zariadenie !!!</h2>}
                    <div className={classes.tempFooter}>
                        <p>Copyright @ 2020 <a href="mailto:martin.nevlaha@gmail.com">Martin Nevlaha</a></p>
                    </div>
                </main>
            </ErrorBoudary>
        );
    }
}
const mapStateToProps = state => {
    return {
        isDegAuth: state.degAuth.token !== null && state.degAuth.isValid,
        isAdminAuth: state.adminAuth.token !== null && state.adminAuth.isValid
    }
}

export default connect(mapStateToProps)(withRouter(Layout));