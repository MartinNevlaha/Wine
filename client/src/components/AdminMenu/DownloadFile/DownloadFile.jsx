import React from 'react';
import download from 'js-file-download';

import Button from '../../UI/Button/Button';
import axiosInstance from '../../../axios-instance';

const DownloadFile = props => {
    const downloadFile = () => {
        axiosInstance.get(`/admin/${props.endPoint}`, {
            headers: {
                "Authorization": `Bearer ${props.token}`
            },
            responseType: 'blob'
        }).then(resp => {
            download(resp.data, `${props.fileName}`)
        })
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.statusText,
                    code: err.response.status
                }
                props.errorDownload(error)
            }
            props.errorDownload(err)
        })
    }
    return (
            <Button clicked={downloadFile} disabled={props.isComplete}>
                {props.children}
            </Button>
        )
}

export default DownloadFile;