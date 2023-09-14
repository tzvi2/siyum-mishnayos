import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DBprovider from './contexts/DBcontext';
import ViewProject from './components/ViewProject';
import NewProjectForm from './components/NewProjectForm';
import About from './components/About';


ReactDOM.render(
  <DBprovider>
    <BrowserRouter basename='/siyum-mishnayos'>
      <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/newproject' element={<NewProjectForm />} />
        <Route path='/viewproject' element={<ViewProject />} />
          <Route path='/viewproject/:projectId' element={<ViewProject />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </DBprovider>
  ,
  document.getElementById('root')
);
