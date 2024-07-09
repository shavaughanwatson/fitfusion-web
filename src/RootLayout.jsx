import { Outlet } from 'react-router-dom';
import ExerciseList from './components/excerciselist';
import MainHeader from './components/mainHeader';
import classes from './RootLayout.module.css';
import { useState, useEffect } from 'react';
import { createContext } from 'react';

export const FitHubContext = createContext();

function RootLayout() {
  const [excerciseList, setExerciseList] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false); // Track user authentication state
  const [query, setQuery] = useState('');

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  async function createSearchList() {
    /*
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b3208b4854msh36f7e48218086fbp179d72jsn330f69a63ef7',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${query}`,
      options
    );

    const data = await response.json();
    console.log(data);
*/
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'b3208b4854msh36f7e48218086fbp179d72jsn330f69a63ef7',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    setExerciseList(data);
  }

  return (
    <FitHubContext.Provider
      value={{
        loggedIn: isLoggedIn,
        setLoggedIn: setisLoggedIn,
      }}
    >
      <MainHeader changeQuery={handleQuery} createList={createSearchList} />
      <div className={classes.body}>
        <ExerciseList list={excerciseList} />
        <div className={classes.child}>
          <Outlet />
        </div>
      </div>
    </FitHubContext.Provider>
  );
}

export default RootLayout;
