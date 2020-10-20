import React from 'react';

import classes from './DegustatorTable.module.css';
import IdInput from '../IdInput/IdInput';
import WineInfo from '../WineInfo/WineInfo';

const degustatorTable = (props) => (
    <div className={classes.DegContainer}>
        <h2>Hodnotenie vína</h2>
        <div className={classes.DegHeader}>
            <IdInput 
            getWineId={props.getWineId}
            value={props.wineIdValue} />
            {props.wineInfo.error && <p style={{color:"red", margin:"5px"}}>{props.wineInfo.error.message}</p>}
            <WineInfo 
            isFetching={props.isFetching}
            wineInfo={props.wineInfo}/>
        </div>
        <table className={classes.DegTable}>
            <tbody>
                <tr>
                    <th colSpan="2"></th>
                    <th>Vynikajúce</th>
                    <th>Veľmi dobré</th>
                    <th>Dobré</th>
                    <th>Uspokojivé</th>
                    <th>Neuspokojivé</th>
                </tr>
                <tr className={classes.GrayBack}>
                    <td rowSpan="2">Vzhlad</td>
                    <td>Čírosť</td>
                    {props.btnsLookClarity}                        
                </tr>
                <tr className={classes.GrayBack}>
                    <td>Vzhľad mimo čírosť</td>
                    {props.btnslookOutOfClarity} 
                </tr>
                <tr>
                    <td rowSpan="3">Vôňa</td>
                    <td>Čistota</td>
                    {props.btnsSmellPurity}
                </tr>
                <tr>
                    <td>Pozitívna intenzita</td>
                    {props.btnsSmellPossitiveIntesity}
                </tr>
                <tr>
                    <td>Kvalita</td>
                    {props.btnsSmellQuality}
                </tr>
                <tr className={classes.GrayBack}>
                    <td rowSpan="4">Chuť</td>
                    <td>Čístota</td>
                    {props.btnsTastePurity}
                </tr>
                <tr className={classes.GrayBack}>
                    <td>Pozitívna intenzita</td>
                    {props.btnsTastePossitiveIntesity}
                </tr>
                <tr className={classes.GrayBack}>
                    <td>Harmonická perzistencia</td>
                    {props.btnsTasteHarmonicPersistence}
                </tr>
                <tr className={classes.GrayBack}>
                    <td>Kvalita</td>
                    {props.btnsTasteQuality}
                </tr>
                <tr>
                    <td></td>
                    <td>Celkový dojem</td>
                    {props.btnsGeneralImpresion}
                </tr>
            </tbody>
        </table>
    </div>
); 

export default degustatorTable;