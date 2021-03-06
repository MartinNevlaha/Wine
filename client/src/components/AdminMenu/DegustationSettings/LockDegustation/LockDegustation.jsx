import React from 'react';

import classes from '../RatingSetting/RatingSetting.module.css';

const LockDegustation = props => (
    <div className={classes.RatingSetting}>
        <h4>Otvorenie / Zatvorenie degustácie</h4>
        <p style={{color: "red"}}>Aktuálne nastavenie:  
            {props.isDegustationOpen ? 
            ' Degustácia je otvorená' : 
            ' Degustácia je zamknutá'}</p>
        <p>Možnosti výberu</p>
        <ul>
            <li>Odomknúť - Degustácia je otvorená jedotlivý degustátori môžu pridávať svoje hodnotenia. Administrátorské nastavenia vín, degustátorov, skupín sú naopak zamknuté</li>
            <li>Zamknúť - Degustácia je zamknutá žiadny degustátor nemôže pridávať hodnotenie, naopak všetky administrátorské možnosti sú odomknuté</li>
        </ul>
        <h5 style={{color: "red"}}>POZOR</h5>
        <p style={{color: "red"}}>Nastavenia nemeniť počas prebiehajúcej degustácie</p>
        <div className={classes.selectWrapper}>
        <select
        type='select'
        defaultValue={props.isDegustationOpen ? props.lock.options[0] : props.lock.options[1]}
        onChange={e => props.getLockHandler(e, props.lock.id)}>
            {props.lock.options.map(opt => (
                <option key={opt}>
                    {opt}
                </option>
            ))}
        </select>
        <p>
        <i className={classes.arrowDown}></i>
      </p>
        </div>
    </div>
);

export default LockDegustation;