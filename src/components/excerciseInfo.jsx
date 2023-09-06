import classes from './exerciseInfo.module.css';
import { useLoaderData } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { FitHubContext } from '../RootLayout';
import axios from 'axios';

function ExerciseInfo() {
  const exerciseInfo = useLoaderData();
  console.log(exerciseInfo);

  const [youtubeLinks, setyoutubeLinks] = useState([]);

  const login = useContext(FitHubContext);

  const addtoBookmark = async () => {
    const exerciseInfoData = {
      name: exerciseInfo.name,
      gifUrl: exerciseInfo.gifUrl,
    };

    const response = await axios.post(
      'https://fithub-app-8ab5.onrender.com/bookmark',
      {
        name: exerciseInfoData.name,
        gifUrl: exerciseInfoData.gifUrl,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the JWT token
        },
      }
    );

    console.log(response);
  };

  /*
  useEffect(() => {
    const fetchYoutubeLinks = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCJHcde5WcNdHtiLWhbKNFP_pZXmF3Y4u0&type=video&part=snippet&q=${exerciseInfo.name}`
      );

      const data = response.json();

      const results = await data;

      const videoLinks = results.items;
      setyoutubeLinks(videoLinks);
      console.log(data);
      console.log(results);
      console.log(results.items);
    };

    fetchYoutubeLinks();
  }, [exerciseInfo.name]);
*/

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.exerciseinfo}>
          <section className={classes.exercisedetailphoto}>
            <h1 className={classes.title}>{exerciseInfo.name}</h1>

            {login.loggedIn ? (
              <button className={classes.bookmarkbtn} onClick={addtoBookmark}>
                Add to Favorites <FaBookmark size={36} />
              </button>
            ) : (
              ''
            )}
          </section>
          <section className={classes.muscledescription}>
            <h1 className={classes.muscleimagetitle}>Muscles Worked</h1>
            <img src={exerciseInfo.gifUrl} className={classes.exerciseGIF} />
          </section>
        </div>

        <div className={classes.exercisevideos}>
          <h1 className={classes.videoheading}>Videos</h1>
          <ul className={classes.videolist}></ul>
        </div>
      </div>
    </>
  );
}

/*
{youtubeLinks.map(video => (
  <li key={video.id.videoId} className={classes.videolink}>
    <iframe
      className={classes.video}
      src={`https://www.youtube.com/embed/${video.id.videoId}`}
    ></iframe>
    <p className={classes.videotitle}>{video.snippet.title}</p>
  </li>
))}
*/
export async function loader({ params }) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd1651994d7mshc9c5687f529368ap1fdccdjsn27d1b71f4a17',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`,
    options
  );
  const data = await response.json();
  return data;
}

export default ExerciseInfo;
