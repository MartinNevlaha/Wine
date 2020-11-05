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
            console.log(resp.data)
            download(resp.data, `${props.fileName}`)
        })
    }
    return (
            <Button clicked={downloadFile} disabled={props.isComplete}>
                {props.children}
            </Button>
        )
}

export default DownloadFile;