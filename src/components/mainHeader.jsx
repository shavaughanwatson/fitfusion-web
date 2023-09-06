import { FaSearch } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from './mainHeader.module.css';
import { useContext, useState, useEffect } from 'react';
import SignupForm from '../components/signupForm';
import LoginForm from '../components/loginForm';
import { FitHubContext } from '../RootLayout';
import Modal from 'react-modal';
import BookmarkList from './bookmarklist';
import axios from 'axios';

function MainHeader({ changeQuery, createList }) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookmarkModal, setBookmarkModal] = useState(false);
  const [user, setUser] = useState(null); // Track user authentication state
  const [bookmark, setbookmark] = useState([]);

  const login = useContext(FitHubContext);

  const openSignupModal = e => {
    e.preventDefault();
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const openBookmarkModal = async e => {
    e.preventDefault();

    try {
      // Make an async API request
      const response = await axios.get('http://localhost:3000/bookmark', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include JWT token
        },
      });

      // Update the state with the data from the response
      console.log(response.data);
      setbookmark(response.data);

      // Set loading to false when the data has been fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors here, e.g., show an error message
    }
    setBookmarkModal(true);
  };

  const closeBookmarkModal = () => {
    setBookmarkModal(false);
  };

  const deleteBookmark = id => {
    const newbookmarkList = bookmark.filter(bookmark => bookmark._id !== id);
    setbookmark([...newbookmarkList]);
  };

  const openLoginModal = e => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = userData => {
    setUser(userData);
    login.setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    login.setLoggedIn(false);
  };

  return (
    <nav className={classes.searchnav}>
      <div className={classes.searchform}>
        <Link to="/">
          <p className={classes.heading}>FITHUB</p>
        </Link>
        <input
          type="text"
          placeholder="What are you looking for ?"
          className={classes.searchinput}
          onChange={changeQuery}
        />
        <button className={classes.searchbutton} onClick={createList}>
          <FaSearch />
        </button>
      </div>

      {login.loggedIn ? (
        <div className={classes.login}>
          <h2 className={classes.heading}>Welcome, {user.username}!</h2>
          <button onClick={openBookmarkModal}>
            <FaBookmark size={36} />
          </button>
          <button className={classes.loginbtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={classes.login}>
          <button className={classes.signupbtn} onClick={openSignupModal}>
            Sign-Up
          </button>
          <button className={classes.loginbtn} onClick={openLoginModal}>
            Login
          </button>
        </div>
      )}

      <Modal
        isOpen={showLoginModal}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <LoginForm onClose={closeLoginModal} onLogin={handleLogin} />
      </Modal>

      <Modal
        isOpen={showBookmarkModal}
        onRequestClose={closeBookmarkModal}
        contentLabel="Signup Modal"
        ariaHideApp={false}
      >
        <BookmarkList
          onClose={closeBookmarkModal}
          list={bookmark}
          setbookmark={deleteBookmark}
        />
      </Modal>

      <Modal
        isOpen={showSignupModal}
        onRequestClose={closeSignupModal}
        contentLabel="Signup Modal"
        ariaHideApp={false}
      >
        <SignupForm onClose={closeSignupModal} onSignup={handleLogin} />
      </Modal>
    </nav>
  );
}

export default MainHeader;
