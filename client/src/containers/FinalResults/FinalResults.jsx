import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ResultsMenuComponent from '../../components/AdminMenu/WineResults/ResultsMenuComponents/ResultsMenuComponent';

class FinalResults extends Component {
    state = {
        resultsMenu: ['Výsledky podľa súťažnej kategórie vín', "Výsledky podľa degustačnej skupiny", 'Výsledky podľa degustátora' ],
        windowWidth: window.innerWidth
    }
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
        this.setState = (state,callback)=>{//fix warn react issue
            return;
        };
    }
    resizeHandler = (e) => {
        this.setState({windowWidth: window.innerWidth});
    }

    clickHandler = (index) => {
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
                windowWidth={this.state.windowWidth}
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