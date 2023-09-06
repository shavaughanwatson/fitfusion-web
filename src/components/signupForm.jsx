import React, { useState } from 'react';
import authService from '../services/authService';
import classes from '../components/signupForm.module.css';
import LoginPhoto from '../assets/login_pic.webp';

const SignupForm = ({ onClose, onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async e => {
    e.preventDefault();
    try {
      const userData = await authService.signup(username, email, password);
      onSignup(userData);
      onClose(); // Close the popup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.SignUpPage}>
      <div>
        <img src={LoginPhoto} className={classes.loginimg} />
      </div>

      <div className={classes.SignUpform}>
        <h2 className={classes.signupsubheading}>Let's get started!</h2>
        <form onSubmit={handleSignup}>
          <div className={classes.inputs}>
            <label className={classes.loginlabel}>Username</label>
            <br />
            <input
              className={classes.signininputs}
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.inputs}>
            <label className={classes.loginlabel}>Email</label>
            <br />
            <input
              className={classes.signininputs}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.inputs}>
            <label className={classes.loginlabel}>Password</label>
            <br />
            <input
              className={classes.signininputs}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={classes.signupbtn}>
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
