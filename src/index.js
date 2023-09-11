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
    <BrowserRouter>
      <React.StrictMode>
      <Routes>
        <Route path='/Siyum-Mishnayos' element={<App />} />
        <Route path='Siyum-Mishnayos/newproject' element={<NewProjectForm />} />
        <Route path='Siyum-Mishnayos/viewproject' element={<ViewProject />}>
          <Route path=":projectId" element={<ViewProject />} />
        </Route>
        <Route path="Siyum-Mishnayos/about" element={<About />} />
      </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </DBprovider>
  ,
  document.getElementById('root')
);
