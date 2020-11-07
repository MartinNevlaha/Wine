import React from 'react';

import Button from '../UI/Button/Button';
import classes from './EntryContent.module.css';

const entryContent = (props) => (
    <div className={classes.EntryContent}>
        <h2>Wine Degustator</h2>
        <p>Je webová aplikácia na hodnotenie vín pri degustačných sútažiach.
        Pri hodnotení je použitý najznámejší 100 bodový systém hodnotenia vína,
        podľa Medzinárodnej únie enológov (UIOE).
        Hodnotiaci porotca (Degustátor) vyberá vopred preddefinovné hodnoty 
        pre jednotlivé kategórie hodnotenia vína systém automaticky vyhodnocuje 
        hodnotené parametre a po skončení degustácie a vyplnení všetkých kategórií 
        hodnotenia Degustátor môže odoslať finálne hodnotenie vína.
        Systém taktiež automaticky zaraďuje víno podľa hodnotenia do nasledovných 
        kategórií:
        </p>
        <ul>
            <li>100 - 95 bodov : Mimoriadne víno</li>
            <li>94 - 90 bodov: Veľmi dobré víno </li>
            <li>90 - 84 bodov: Dobré víno</li>
            <li>83 - 79 bodov: Dobré víno</li>
            <li>78 - 69 bodov: Priemerné víno </li>
            <li>pod 68 bodov: Podprienerné víno</li>
        </ul>
        <Button clicked={props.toggleLoginHandler}>Prihlásiť sa ako Degustátor</Button> 
    </div>
);

export default entryContent;