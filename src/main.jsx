import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ExerciseInfo, {
  loader as ExerciseDetailLoader,
} from './components/excerciseInfo';

import HomePage from './components/homePage';

import './index.css';
import RootLayout from './RootLayout';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:id',
        element: <ExerciseInfo />,
        loader: ExerciseDetailLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
