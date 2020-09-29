import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classes from './SearchBar.module.css'

const searchBar = (props) => (
    <div className={classes.Search}>
        <FontAwesomeIcon icon={faSearch}/>
        <input 
        type="text" 
        value={props.searchValue}
        onChange={(e) => props.getSearchValue(e)} />
        <select 
        id="search" 
        value={props.headerValue}
        onChange={(e) => props.getHeadValue(e)}
        >
            {props.options.map(opt => 
            <option key={opt}>
                {opt}
            </option>
            )}
        </select>
    </div>
    
);

export default searchBar;