import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import WineList from '../../components/AdminMenu/WineList/WineList';
import DegustatorList from '../../components/AdminMenu/DegustatorList/DegustatorList';
import DegustatorGroup from '../../components/AdminMenu/DegGropsList/DegGroupsList';
import WineResults from '../../components/AdminMenu/WineResults/WineResults';
import DatabaseMenu from '../../components/AdminMenu/DatabaseMenu/DatabaseMenu';

class AdminZone extends Component {
    
    clickHandler = (index, adminChoose, btnType) => {
        if (adminChoose === 'Uprav vína') {
            this.props.history.push("/editwine")
        } else if (adminChoose === 'Zobraz vína') {
            this.props.history.push("/winelist")
        } else if (adminChoose === 'Uprav degustátorov') {
            this.props.history.push('/edit-degustator')
        } else if (adminChoose === 'Zobraz degustátorov') {
            this.props.history.push('/deglist')
        } else if (adminChoose === 'Uprav skupiny') {
            this.props.history.push('/edit-deg-group')
        } else if (adminChoose === 'Zobraz skupiny') {
            this.props.history.push('/deg-groups')
        }
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <WineList clicked={this.clickHandler} />
                <DegustatorList clicked={this.clickHandler}/>
                <DegustatorGroup clicked={this.clickHandler}/>
                <WineResults />
                <DatabaseMenu />
            </ElementWrapper>
            );
    }
}

export default withRouter(AdminZone);