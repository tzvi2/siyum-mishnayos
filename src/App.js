import React, {useState} from 'react'
import './App.css';
import NewProjectForm from './components/NewProjectForm'
import RecentProjectFeed from './components/RecentProjectFeed'
import Header from './components/Header'
import ViewProject from '../src/components/ViewProject'
import {Link, Routes, Route} from 'react-router-dom'
import right_arrow from './images/right_arrow.png'
import Mishna from './components/Mishna';
import TextAnimation from './components/TextAnimation';

function App() {
  return (
    <div className="App">
      <Header />
      <TextAnimation />
      <div id="flame"></div>
      <div className="container">
        <Mishna />
      </div>
      <div className="container">
        <Link id="newProjLink" to="newproject">New Project <img id="rightarrow" src={right_arrow}></img> </Link>
      </div>
      <div className="container"> 
        <Link id="newProjLink" to="about">Learn more <img id="rightarrow" src={right_arrow}></img> </Link>
      </div>
      {/* <RecentProjectFeed /> */}
    </div> 
  );

}

export default App;
