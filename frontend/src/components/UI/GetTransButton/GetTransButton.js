import React from 'react';
import classes from './GetTransButton.module.css'


const GetTransButton = ({buttonName, ...props}) => {
    return (
        <button {...props} className={classes.getTransButton}>
            {buttonName}
        </button>
    );
};

export default GetTransButton;