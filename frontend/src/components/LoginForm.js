import React, {useState} from 'react';
import axios from "axios";
import LoginInput from "./UI/LoginInput/LoginInput";
import LoginButton from "./UI/LoginButton/LoginButton";

const LoginForm = (props) => {
    const [loginData, setLoginData] = useState({username: '', password: ''})
    let apiLoginForm = () => {
        let newData = new FormData();
        newData.append('username', loginData.username);
        newData.append('password', loginData.password);
        axios.post('http://127.0.0.1:8000/auth/sign-in', newData).then((response) => {
            window.localStorage.setItem('Authorization', `Bearer ${response.data.access_token}`);
        });
        setLoginData({username: '', password: ''})
        props.changeVisibile({'display': 'none'})
    }

    return (
        <div className="loginForm" style={props.visible}>
            <form>
                <LoginInput type="text" id="username" placeholder="username" value={loginData.username}
                       onChange={e => setLoginData({...loginData, username: e.target.value})} />
                <br/>
                <LoginInput type="password" id="password" placeholder="password" value={loginData.password}
                       onChange={e => setLoginData({...loginData, password: e.target.value})}/>
                <br/>
                <LoginButton buttonName="Login" type="button" onClick={() => apiLoginForm()}></LoginButton>
            </form>
        </div>
    );
};

export default LoginForm;