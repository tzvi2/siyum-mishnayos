import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DBprovider from './contexts/DBcontext';
import ViewProject from './components/ViewProject';
import NewProjectForm from './components/NewProjectForm';
import Header from './components/Header'

console.log('index.js')

ReactDOM.render(
  <DBprovider>
    <BrowserRouter>
      <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/newproject' element={<NewProjectForm />} />
        <Route path='/viewproject' element={<ViewProject />}>
          <Route path=":projectId" element={<ViewProject />} />
        </Route>
      </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </DBprovider>
  ,
  document.getElementById('root')
);
