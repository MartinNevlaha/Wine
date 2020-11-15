import React, {Component} from 'react';
import download from 'js-file-download';

import Button from '../../UI/Button/Button';
import axiosInstance from '../../../axios-instance';
import Spinner from '../../UI/Spinner/Spinner';


class DownloadFile extends Component {
    state= {
        showLoading: false
    }
    downloadFile = () => {
        this.setState({showLoading: true})
        axiosInstance.get(`/admin/${this.props.endPoint}`, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            },
            responseType: 'blob'
        }).then(resp => {
            download(resp.data, `${this.props.fileName}`)
            this.setState({showLoading: false})
        })
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.statusText,
                    code: err.response.status
                }
                this.props.errorDownload(error)
                this.setState({showLoading: false})
            }
            this.props.errorDownload(err)
            this.setState({showLoading: false})
        })
    }
    render() {
    return (
            <React.Fragment>
                {this.state.showLoading ? <Spinner type='small' /> :
                <Button clicked={this.downloadFile} disabled={this.props.isComplete}>
                    {this.props.children}
                </Button>
                }   
            </React.Fragment>
        )
    }
}

export default DownloadFile;