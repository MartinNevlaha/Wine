import React, { Component } from 'react';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import CSVReader from '../CsvReader/CsvReader';
import classes from './DatabaseEdit.module.css';

class DatabaseEdit extends Component {
    state = {
        isCsvLoad: false,
        csvData: null
    }
    csvLoadHandler = (data) => {
        this.setState({
            csvData: data,
            isCsvLoad: !this.state.isCsvLoad
        })
    }

    render() {
        return (
            <ElementWrapper wrapperType="SmallWrapper">
                <h4>Správa databázy</h4>
                <p style={{color:"red"}}>POZOR!</p>
                <p style={{padding:"0 10px"}}>Každý zásach môže viesť k strate uložených dát. Databázu spravujte len po alebo pred skončením degustácie.</p>
                <div className={this.state.isCsvLoad ? classes.DBimport_loaded : classes.DBimport}> 
                    <CSVReader 
                    csvLoad={this.csvLoadHandler}
                    isImportingDb={this.props.isImportingDb}
                    />
                    <Button 
                    disabled={!this.state.isCsvLoad}
                    clicked={()=>this.props.importDbHandler(this.state.csvData)}
                    >Odoslať</Button>
                </div>
                <div className={classes.DBreset}>
                    <h4>Reset databázy</h4>
                    <Button clicked={this.props.resetDb}>Vymazať databázu</Button>
                </div>
            </ElementWrapper>
        );
    }
} 

export default DatabaseEdit