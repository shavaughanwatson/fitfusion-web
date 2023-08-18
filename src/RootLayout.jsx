import { Outlet } from 'react-router-dom';
import ExerciseList from './components/excerciselist';

import MainHeader from './components/mainHeader';
import classes from './RootLayout.module.css';
import { useState, useEffect } from 'react';

function RootLayout() {
  const [excerciseList, setExerciseList] = useState([]);
  const [query, setQuery] = useState('');

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  async function createSearchList() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd1651994d7mshc9c5687f529368ap1fdccdjsn27d1b71f4a17',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${query}`,
      options
    );

    const data = await response.json();
    console.log(data);
    localStorage.setItem('exerciseList', JSON.stringify(data));
    setExerciseList(data);
  }

  useEffect(() => {
    const savedExerciseList = localStorage.getItem('exerciseList');

    if (savedExerciseList) {
      setExerciseList(JSON.parse(savedExerciseList));
    }
  }, []);

  return (
    <>
      <MainHeader changeQuery={handleQuery} createList={createSearchList} />
      <div className={classes.body}>
        <ExerciseList list={excerciseList} />
        <div className={classes.child}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default RootLayout;
