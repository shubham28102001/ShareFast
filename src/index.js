import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import FileUpload from './pages/FileUpload/FileUpload.jsx';
import SuccessMessage from './pages/SuccessMessage/SuccessMessage.jsx';
import FileDownload from './pages/FileDownload/FileDownload.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/upload' element={<FileUpload />}></Route>
      <Route path='/success' element={<SuccessMessage />}></Route>
      <Route path='/download' element={<FileDownload />}></Route>
      <Route path="*">ERROR 404</Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
