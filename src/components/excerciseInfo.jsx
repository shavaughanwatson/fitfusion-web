import classes from './exerciseInfo.module.css';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

function ExerciseInfo() {
  const exerciseInfo = useLoaderData();
  console.log(exerciseInfo);

  const [youtubeLinks, setyoutubeLinks] = useState([]);

  useEffect(() => {
    async function fetchYoutubeLinks() {
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
    }

    fetchYoutubeLinks();
  }, [exerciseInfo.name]);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.exerciseinfo}>
          <section className={classes.exercisedetailphoto}>
            <h1 className={classes.title}>{exerciseInfo.name}</h1>
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
