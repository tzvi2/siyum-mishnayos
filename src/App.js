import React, {useState} from 'react'
import './App.css';
import NewProjectForm from './components/NewProjectForm'
import RecentProjectFeed from './components/RecentProjectFeed'
import Header from './components/Header'
import ViewProject from '../src/components/ViewProject'
import {Link, Routes, Route} from 'react-router-dom'
import Gemara from './components/Gemara';
import TextAnimation from './components/TextAnimation';

function App() {
  console.log("App")
  return (
    // <div className="App">
    //   <TextAnimation />
    //   <div id="flame"></div>
    //   <div className="container">
    //     <Gemara />
        <Link className="lightBtn solo" to="newproject">New Project</Link>
      /* </div>
      <RecentProjectFeed />
    </div> */
  );
}

export default App;
