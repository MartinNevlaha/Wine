import React, { Component } from 'react';

import classes from './ResumeTable.module.css';


class ResumeTable extends Component {

    render() {
        let results = (<React.Fragment>
        <table className={classes.SendDataTable}>
        <tbody>
            <tr className={classes.GrayBack}>
                <td rowSpan="2">Vzhlad</td>
                <td>Čírosť</td>
                <td>{this.props.sendData.results.lookClarity}</td> 
            </tr>
            <tr className={classes.GrayBack}>
                <td>Vzhľad mimo čírosť</td>
                <td>{this.props.sendData.results.lookOutOfClarity}</td>
            </tr>
            <tr>
                <td rowSpan="3">Vôňa</td>
                <td>Čistota</td>
                <td>{this.props.sendData.results.smellPurity}</td>
            </tr>
            <tr>
                <td>Pozitívna intenzita</td>
                <td>{this.props.sendData.results.smellPossitiveIntesity}</td>
            </tr>
            <tr>
                <td>Kvalita</td>
                <td>{this.props.sendData.results.smellQuality}</td>
            </tr>
            <tr className={classes.GrayBack}>
                <td rowSpan="4">Chuť</td>
                <td>Čístota</td>
                <td>{this.props.sendData.results.tastePurity}</td>
            </tr>
            <tr className={classes.GrayBack}>
                <td>Pozitívna intenzita</td>
                <td>{this.props.sendData.results.tastePossitiveIntesity}</td>
            </tr>
            <tr className={classes.GrayBack}>
                <td>Harmonická perzistencia</td>
                <td>{this.props.sendData.results.tasteHarmonicPersistence}</td>
            </tr>
            <tr className={classes.GrayBack}>
                <td>Kvalita</td>
                <td>{this.props.sendData.results.tasteQuality}</td>
            </tr>
            <tr>
                <td></td>
                <td>Celkový dojem</td>
                <td>{this.props.sendData.results.generalImpresion}</td>
            </tr>
        </tbody>
        </table>
        <table className={classes.SendDataTable}>
            <tbody>
                <tr>
                    <td></td>
                    <td>Kategoria vina</td>
                    <td>{this.props.sendData.wineCategory}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Spolu bodov</td>
                    <td>{this.props.sendData.totalSum}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>);
    if (this.props.sendData.eliminated) {
        results= <p>Víno ste eliminovali</p>
    }
        return results;
    }
} 

export default ResumeTable;