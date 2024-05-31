import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailImage from '../../images/email.png';
import personImage from '../../images/person.png';
import passwordImage from '../../images/password.png';
import CSS from './Login.module.css';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import axios from "axios";
import { backedUrl } from "../../apiUrl"

const Login = ({ toggleLoginPopup }) => {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [showforgetPopup, setShowLoginPopup] = useState(false);
  const [Logindis, setLogindis] = useState(false);

  const toggleforgetPopup = () => {
    setShowLoginPopup(!showforgetPopup);
  };


  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isNameValid = (name) => {
    const emailRegex = /^[a-zA-Z\s]+$/;
    return emailRegex.test(name);
  };
  const isPasswordValid = (password) => {
    const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    return emailRegex.test(password);
  };

  const handleSignUp = async (e) => {
    try {
      setAction("Sign Up")
      if (!name || !emailInput || !password) {
        // alert("Fill all fields")
        return
      }
      e.preventDefault();
      if (!isNameValid(name) && action !== "Login") {
        alert("Please enter correct name.");
        return false;
      }

      if (!isEmailValid(emailInput) && action !== "Login") {
        alert("Please enter a valid email address.");
        return false;
      }
      // if (!isPasswordValid(password) && action !== "Login") {
      //   alert("Please enter strong password which includes special characters.");
      //   return false;
      // }
      let ourdata = { username: name, email: emailInput, password }
      let { data } = await axios.post(`${backedUrl}/api/register`, ourdata)
      if (data.success) {
        if (data.usernamealreadyExist) {
          alert("Username already exists.")
          return
        }
        if (data.emailalreadyExist) {
          alert("Email already exists.")
          return
        }
        setName("");
        setEmailInput("");
        setPassword("")
        console.log("data", data)
        localStorage.setItem("buyer", JSON.stringify(data.data))
        setAction('')
        alert("Account creeted successfully")
        toggleLoginPopup()
      }

    } catch (error) {
      console.log("error", error)
    }
  };

  const handleLogin = async (e) => {
    try {
      setAction("Login")
      e.preventDefault();
      if (!isEmailValid(emailInput) && action !== "Sign Up") {
        alert("Please enter a valid email address.");
        return false;
      }
      // if (!isPasswordValid(password) && action !== "Sign Up") {
      //   alert("Please enter your correct password.");
      //   return false;
      // }
      let ourdata = { username: name, email: emailInput, password }
      let { data } = await axios.post(`${backedUrl}/api/login`, ourdata)
      if (data.success) {
        setEmailInput("");
        setPassword("")
        console.log("data", data)
        localStorage.setItem("buyer", JSON.stringify(data.data))
        setAction('')
        alert("LoggedIn successfully")
        toggleLoginPopup()
      }
      setEmailInput("");
      setPassword("");
    } catch (error) {
      console.log("error in login", error);
    }

  };

  return (
    <div className={CSS['containera']}>
      <div className={CSS['header']}>
        <div className={CSS['text']}>{Logindis ? "Login" : "Sign Up"}</div>
      </div>
      <div className={CSS['allinputs']}>
        {Logindis ? null : (
          <div className={CSS['inputs']}>
            <img width={'20px'} height={'20px'} src={personImage} alt='' />
            <input  type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required={true}/>
          </div>
        )}
        <div className={CSS['inputs']}>
          <img width={'20px'} height={'15px'} src={emailImage} alt='' />
          <input required type='email' placeholder='Email' value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }} />
        </div>
        <div className={CSS['inputs']}>
          <img width={'20px'} height={'20px'} src={passwordImage} alt='' />
          <input required type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
      </div>
      {action === 'Sign Up' ? null : (
        <div className={CSS['forget-password']}>
          Forget Password?{' '}
          <Link className={CSS['forget-password-link']} >
            <span onClick={toggleforgetPopup}>Click here!</span>
          </Link>
        </div>
      )}

      <div className={CSS['submit-container']}>
        {Logindis ? <button type='submit' className={action === 'Sign Up' ? `${CSS['submit']}` : `${CSS['submit']}`} onClick={handleLogin}>
          Login
        </button> :
          <button type='submit' className={action === 'Login' ? `${CSS['submit']}` : `${CSS['submit']}`} onClick={handleSignUp} >
            Sign Up 
          </button>}
      </div>
      <div style={{ margin: "auto" }}>
        {Logindis ? <a href='#' onClick={() => setLogindis(false)}>Signup</a>
          : <a href='#' onClick={() => setLogindis(true)}>Login</a>}
      </div>
      {showforgetPopup && (
        <div className={CSS.login_popup}>
          <ForgetPassword />
          <div className={CSS.close_popup} onClick={toggleforgetPopup}>
            <span className={CSS.close_popup_btn}>&times;</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
