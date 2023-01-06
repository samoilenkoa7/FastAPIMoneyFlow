import React from 'react';
import classes from "./LoginInput.module.css";


const LoginInput = (props) => {
    return (
        <input {...props} className={classes.loginInput}/>
    );
};

export default LoginInput;