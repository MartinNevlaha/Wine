import React, { Component } from 'react';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';

class ResultsByDegustator extends Component {

    render() {
        return (
            <ElementWrapper>
            <Back />
            ...By Degustator
            </ElementWrapper>
        )
    }
}
export default ResultsByDegustator;