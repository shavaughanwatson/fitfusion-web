import classes from './excerciselist.module.css';

import axios from 'axios';

function BookmarkList({ list, setbookmark }) {
  const DeleteBookmark = async function (id) {
    try {
      // Extract the token from local storage
      const token = localStorage.getItem('token');

      // Make a DELETE request to delete a product
      const response = axios.delete(
        `https://fithub-app-8ab5.onrender.com/bookmark/${id}`,
        {
          headers: {
            Authorization: `${token}`, // Include the JWT token
          },
        }
      );

      // Optionally, you can handle the response or perform any necessary actions
      console.log(response);

      setbookmark(id);
    } catch (error) {
      console.error('Delete product error:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <>
      <aside className={classes.filtermenus}>
        <div className={classes.listheading}>
          <h1 className={classes.heading}>Bookmark List</h1>
        </div>
        <ul className={classes.filteroptions}>
          {list.length === 0 ? (
            <div>
              <p> No excercise has been selected yet!</p>
            </div>
          ) : (
            list.map(exercise => (
              <li className={classes.exerciseitem} key={exercise._id}>
                <div className={classes.excercise}>
                  <figure className={classes.excercisePhoto}>
                    <img className={classes.photo} src={exercise.gifUrl} />
                    <button onClick={() => DeleteBookmark(exercise._id)}>
                      Delete
                    </button>
                  </figure>
                  <p className={classes.excercisetitle}>{exercise.name}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  );
}

export default BookmarkList;
