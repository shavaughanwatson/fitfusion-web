import classes from './homePage.module.css';
import ExercisePhoto from '../assets/homepage.jpg';

function HomePage() {
  return (
    <div className={classes.mainintro}>
      <section className={classes.mainintrodesc}>
        <h2 className={classes.heading}>Welcome to FITHUB</h2>
        <p className={classes.description}>
          Here you can find videos on how to exercise and nutrition.
        </p>
      </section>

      <section className={classes.mainintrophoto}>
        <img src={ExercisePhoto} className={classes.photo} />
      </section>
    </div>
  );
}

export default HomePage;
