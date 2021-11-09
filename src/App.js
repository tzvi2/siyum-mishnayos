import React, {useState} from 'react'
import './App.css';
import NewProjectForm from './components/NewProjectForm'
import RecentProjectFeed from './components/RecentProjectFeed'
import ViewProject from '../src/components/ViewProject'

function App() {
  const [createNewProject, setCreateNewProject] = useState(false)
  const clear = () => {
    setCreateNewProject(false)
  }
  return (
    <div className="App">
      <h1 onClick={() => clear()}>Siyum Mishnayos</h1>
      <div id="flame"></div>
      {!createNewProject ?
      <>
      <div className="container">
        <div id="bookDiv">
          <div id="book1">
            <span>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </span>
          </div>
          <div id="book2">
            <span>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </span>
          </div>
        </div>
        <input type="button" value="New Project" onClick={() => setCreateNewProject(true)}></input>
        {/* <input type="button" value="View All"></input> */}
      </div>
      <RecentProjectFeed />
      </>
      : <NewProjectForm />}
     
    </div>
  );
}

export default App;
