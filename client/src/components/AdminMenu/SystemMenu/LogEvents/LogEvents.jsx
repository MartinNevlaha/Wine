import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import DownloadLog from './DownloadLog/DownloadLog';
import classes from './LogEvents.module.css';

class LogEvents extends Component {
    state = {
        logs: []
    };
    componentDidMount() {
        const socket = openSocket('http://localhost:8080');
        socket.on('post-log', data => {
            if (data.action === 'create') {
                this.addPost(data.log)
            }
        })
    }
    addPost = (log) => {   
        this.setState(prevState => ({
            logs: [ log , ...prevState.logs ]
        }))
    }
    
    render() {
        let logs = this.state.logs.map(log => 
        <p>{`${log.time}, skupina: ${log.group}, degustátor: ${log.degId}, 
        víno: ${log.wine}, eliminované: ${log.eliminated}, kategoria vína: ${log.wineCategory}, 
        hodnotenie: ${log.totalSum}`}</p>)
        return (
            <div className={classes.LogContainer}>
                <h4>POST logs from server</h4>
                <div className={classes.Logs}>
                    {logs}
                </div>
                <DownloadLog token={this.props.token} />
            </div>
        )
    }
}


export default LogEvents;