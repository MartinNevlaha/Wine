import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ResultsMenuComponent from '../../components/AdminMenu/WineResults/ResultsMenuComponents/ResultsMenuComponent';

class FinalResults extends Component {
    state = {
        resultsMenu: ['Výsledky podľa súťažnej kategórie vín', "Výsledky podľa degustačnej skupiny", 'Výsledky podľa degustátora' ]
    }
    componentDidMount() {

    }

    clickHandler = (index) => {
        console.log(index)
        if (index === 0 ) {
            this.props.history.push('/results-by-category');
        } else if (index === 1) {
            this.props.history.push('/results-by-deg-group');
        } else if (index === 2) {
            this.props.history.push('/results-by-degustator');
        }
    } 

    render() {

        return (
            <React.Fragment>
            <ElementWrapper wrapperType="ElementWrapper">
                {this.state.resultsMenu.map((resultComName, index) => 
                <ResultsMenuComponent 
                key={resultComName}
                clicked={this.clickHandler}
                index={index}
                name={resultComName}/>)}
            </ElementWrapper>
        </React.Fragment>
        )
    }
}

export default withRouter(FinalResults);