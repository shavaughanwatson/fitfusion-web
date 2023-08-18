import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from './mainHeader.module.css';
function MainHeader({ changeQuery, createList }) {
  return (
    <nav className={classes.searchnav}>
      <div className={classes.logo}>
        <Link to="/">
          <p className={classes.heading}>FITHUB</p>
        </Link>
      </div>

      <div className={classes.searchform}>
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
    </nav>
  );
}

export default MainHeader;
