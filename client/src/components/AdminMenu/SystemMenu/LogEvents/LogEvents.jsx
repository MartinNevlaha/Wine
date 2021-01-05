import React, { Component } from "react";
import openSocket from "socket.io-client";

import DownloadFile from "../../DownloadFile/DownloadFile";
import classes from "./LogEvents.module.css";

class LogEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
    this.server = process.env.REACT_APP_SOCKET_SERVER;
    this.socket = openSocket(this.server);
  }
  componentDidMount() {
    this.socket.on("post-log", (data) => {
      if (data.action === "create") {
        this.addPost(data.log);
      }
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.close();
  }

  addPost = (log) => {
    this.setState((prevState) => ({
      logs: [log, ...prevState.logs],
    }));
  };

  render() {
    let logs = this.state.logs.map((log) => (
      <p>{`${log.time}, skupina: ${log.group}, degustátor: ${log.degId}, 
        víno: ${log.wine}, eliminované: ${log.eliminated}, kategoria vína: ${log.wineCategory}, 
        hodnotenie: ${log.totalSum}`}</p>
    ));
    return (
      <div className={classes.LogContainer}>
        <h4>POST logs from server</h4>
        <div className={classes.Logs}>{logs}</div>
        <DownloadFile
          errorDownload={this.props.errorDownload}
          endPoint="download-logs"
          fileName="postResults.log"
          token={this.props.token}
        >
          Stahnuť kompletný log
        </DownloadFile>
      </div>
    );
  }
}

export default LogEvents;
