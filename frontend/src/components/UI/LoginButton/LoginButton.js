import React from 'react';
import classes from './LoginButton.module.css'


const LoginButton = ({buttonName, ...props}) => {
    return (
        <button {...props} className={classes.loginButton}>
            {buttonName}
        </button>
    );
};

export default LoginButton;