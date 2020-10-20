import React from 'react';

import UserInputFrom from '../../../UserInput/UserInput';
import Button from '../../../UI/Button/Button';
import classes from '../RatingSetting/RatingSetting.module.css';

const LockDegustation = props => (
    <div className={classes.RatingSetting}>
        <h4>Otvorenie / Zatvorenie degustácie</h4>
        <p>Možnosti výberu</p>
        <ul>
            <li>Odomknúť - Degustácia je otvorená jedotlivý degustátori môžu pridávať svoje hodnotenia. Administrátorské nastavenia vín, degustátorov, skupín sú naopak zamknuté</li>
            <li>Zamknúť - Degustácia je zamknutá žiadny degustátor nemôže pridávať hodnotenie, naopak všetky administrátorské možnosti sú odomknuté</li>
        </ul>
        <UserInputFrom 
        id={props.lock.id}
        labelName={props.lock.labelName}
        inputType={props.lock.inputType}
        placeholder={props.lock.placeholder}
        options={props.lock.options}
        value={props.lock.value}
        change={props.getLockHandler}
        >Zamknúť / Odomkúť</UserInputFrom>
        <Button clicked={props.saveIsLock}>Ulož nastavenie</Button>
    </div>
);

export default LockDegustation;