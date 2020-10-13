import React from 'react';
import download from 'js-file-download';

import Button from '../../../../UI/Button/Button';
import axiosInstance from '../../../../../axios-instance';

const DownloadLog = props => {
    const downloadFile = () => {
        axiosInstance.get('/admin/download-logs', {
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        }).then(resp => download(resp.data, 'postResults.log'))
    }
    return (
            <Button clicked={downloadFile}>
                Stiahnuť kompletný log
            </Button>
        )
}

export default DownloadLog;