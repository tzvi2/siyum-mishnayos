import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DBprovider from './contexts/DBcontext';
import ViewProject from './components/ViewProject';

ReactDOM.render(
  <DBprovider>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='viewproject' element={<ViewProject />}>
            <Route path=":projectId" element={<ViewProject />} />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </DBprovider>
  ,
  document.getElementById('root')
);
