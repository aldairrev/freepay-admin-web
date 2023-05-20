import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import Home from './pages/admin/Home.tsx';
import Login from './pages/Login.tsx';
import NotFound from './pages/NotFound.tsx';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>

          <Route path="/login" element={<Login />}/>
          <Route path="/admin/home" element={<Home />} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
