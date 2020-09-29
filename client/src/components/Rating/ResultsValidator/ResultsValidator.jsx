import React, { Component } from 'react';

import classes from './ResultsValidator.module.css';

class ResultsValidator extends Component {
    render() {
        return(
            <React.Fragment>
                <h4>Je hodnotenie v poriadku?</h4>
                <p>Číslo vína: 
                    <span className={this.props.isWineIdValid? classes.Succes : classes.Danger}>
                        {this.props.isWineIdValid ? ' Ok' : ' Zadaj číslo vína'}
                    </span>
                </p>
            <p>Vaše hodnotenie: 
                <span className={this.props.isRatingValid ? classes.Succes : classes.Danger}>
                    {this.props.isRatingValid ? ' Ok' : ' Nekompletné'}
                </span>
            </p>
            </React.Fragment>
        );
    }
}

export default ResultsValidator;