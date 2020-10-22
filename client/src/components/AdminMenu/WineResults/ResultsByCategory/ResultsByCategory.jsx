import React, { Component } from 'react';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';

class ResultsByCategory extends Component {

    render() {
        return (
            <ElementWrapper>
                <Back />
                ...By Category
            </ElementWrapper>
        )
    }
}

export default ResultsByCategory;