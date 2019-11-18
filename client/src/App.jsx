import React from 'react';
// import DetailsPage from './components/DetailsPage/DetailsPage.jsx';
import Headerbar from './components/headerbar/Headerbar.jsx';
// import SignUp from './components/SignUp/SignUp.jsx';
// import Login from './components/Login/Login.jsx';
// import Goals from './components/Goals/Goals.jsx';
import JobSearch from './components/JobSearch.jsx';

export default function App() {
  return (
    <div>
      <Headerbar />
      <JobSearch />
      {/* <DetailsPage />
      <Login />
      <SignUp /> */}
    </div>
  );
}
