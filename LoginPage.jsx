import React, { useState } from 'react';
import classes from './src/components/loginForm.module.css';
import LoginForm from './src/components/loginForm';
import SignupForm from './src/components/signupForm';
import LoginPhoto from './src/assets/login_pic.webp';
import Modal from 'react-modal';

function LoginPage() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openSignupModal = e => {
    e.preventDefault();
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleLogin = userData => {
    setUser(userData);
  };

  return (
    <div className={classes.loginPage}>
      <div>
        <img src={LoginPhoto} className={classes.loginimg} />
      </div>
      <LoginForm signupaction={openSignupModal} />
      <Modal
        isOpen={showSignupModal}
        onRequestClose={closeSignupModal}
        contentLabel="Signup Modal"
      >
        <SignupForm onClose={closeSignupModal} onSignup={handleLogin} />
      </Modal>
    </div>
  );
}

export default LoginPage;
