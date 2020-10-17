import React from 'react';

import classes from './RatingSetting.module.css';
import UserInput from '../../../UserInput/UserInput';
import Button from '../../../UI/Button/Button';

const RatingSetting = props => (
    <div className={classes.RatingSetting}>
        <h4>Nastavenia výsledného hodnotenia v skupinách</h4>
        <p>Možnosti výberu nastavenia</p>
        <ul>
            <li>Eliminácia krajných hodnôt - Vráti vážený priemer od degustátorov v skupinách po elimináci najlepšieho a najhoršieho hodnotenia</li>
            <li>Bez elminácie krajných hodnôt - Vráti vážený priemer všetkých hodnotení od degustátorov v skupinách</li>
        </ul>
        <UserInput 
        id={props.input.id}
        labelName={props.input.labelName}
        inputType={props.input.inputType}
        placeholder={props.input.placeholder}
        options={props.input.options}
        value={props.input.value}
        change={props.getValueHandler}
        >Vyber systém hodnotenia</UserInput>
        <Button clicked={props.save}>Ulož nastavenie</Button>
    </div>
)


export default RatingSetting;