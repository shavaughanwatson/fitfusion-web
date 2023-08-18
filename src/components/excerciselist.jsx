import classes from './excerciselist.module.css';
import { Link } from 'react-router-dom';

function ExerciseList({ list }) {
  return (
    <>
      <aside className={classes.filtermenus}>
        <div className={classes.listheading}>
          <h1 className={classes.heading}>Exercise List</h1>
        </div>
        <ul className={classes.filteroptions}>
          {list.length === 0 ? (
            <div>
              <p> No excercise has been selected yet!</p>
            </div>
          ) : (
            list.map(exercise => (
              <Link to={`/${exercise.id}`} key={exercise.id}>
                <li className={classes.exerciseitem}>
                  <div className={classes.excercise}>
                    <figure className={classes.excercisePhoto}>
                      <img className={classes.photo} src={exercise.gifUrl} />
                    </figure>
                    <p className={classes.excercisetitle}>{exercise.name}</p>
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      </aside>
    </>
  );
}

export default ExerciseList;
