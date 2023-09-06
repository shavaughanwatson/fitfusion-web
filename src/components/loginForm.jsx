import React, { useState } from 'react';
import authService from '../services/authService';
import classes from '../components/loginForm.module.css';
import LoginPhoto from '../assets/login_pic.webp';

const LoginForm = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    onClose();
    try {
      const userData = await authService.login(email, password);
      // Redirect or show a success message
      onLogin(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.loginPage}>
      <div>
        <img src={LoginPhoto} className={classes.loginimg} />
      </div>

      <div>
        <h3 className={classes.loginsubheading}>Welcome to FITHUB</h3>
        <h1 className={classes.loginheading}>
          START TO
          <span className={classes.highlight}>
            <br />
            GET FIT !
          </span>
        </h1>

        <form className={classes.loginform} onSubmit={handleLogin}>
          <div className={classes.inputs}>
            <label className={classes.loginlabel}>Email</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              className={classes.logininput}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.inputs}>
            <label className={classes.loginlabel}>Password</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              className={classes.logininput}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.ctabtn}>
            <button type="submit" className={classes.loginbtn}>
              Login
            </button>
          </div>
          <div className={classes.ctabtn}></div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
