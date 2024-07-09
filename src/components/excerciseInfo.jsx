import classes from './exerciseInfo.module.css';
import { useLoaderData } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { FitHubContext } from '../RootLayout';
import { API_KEY } from '../services/config';
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

  useEffect(() => {
    const fetchYoutubeLinks = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&q=${exerciseInfo.name}`
      );
      console.log(API_KEY);
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
          <ul className={classes.videolist}>
            {youtubeLinks.map(video => (
              <li key={video.id.videoId} className={classes.videolink}>
                <iframe
                  className={classes.video}
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                ></iframe>
                <p className={classes.videotitle}>{video.snippet.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b3208b4854msh36f7e48218086fbp179d72jsn330f69a63ef7',
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
