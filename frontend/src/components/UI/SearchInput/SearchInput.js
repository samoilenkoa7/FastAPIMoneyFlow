import React from 'react';
import classes from './SearchInput.module.css'
import GetTransButton from "../GetTransButton/GetTransButton";

const SearchInput = ({onClick, ...props}) => {
    return (
        <div
            style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'center'}}>
                <input {...props} type="text" id="searchInput"  className={classes.mySearchInput}/>
                <GetTransButton onClick={onClick} buttonName="Find" />
        </div>
    );
};

export default SearchInput;