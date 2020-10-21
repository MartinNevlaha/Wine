import React, { Component } from 'react';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ResultsMenuComponent from '../../components/AdminMenu/WineResults/ResultsMenuComponents/ResultsMenuComponent';

class FinalResults extends Component {
    state = {
        resultsMenu: ['Výsledky podľa súťažnej kategórie vín', "Výsledky podľa degustačnej skupiny", 'Výsledky podľa degustátora' ]
    }
    chooseHandler = (index) => {
        console.log(index)
    } 
    render() {

        return (
            <React.Fragment>
            <ElementWrapper wrapperType="ElementWrapper">
                {this.state.resultsMenu.map((resultComName, index) => 
                <ResultsMenuComponent 
                key={resultComName}
                clicked={this.chooseHandler}
                index={index}
                name={resultComName}/>)}
            </ElementWrapper>
        </React.Fragment>
        )
    }
}

export default FinalResults;