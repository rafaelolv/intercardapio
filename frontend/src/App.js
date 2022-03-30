import React from "react";

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
// import { Switch } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPrato from './components/AddPrato';
import Prato from './components/Prato';
import PratoList from './components/PratoList';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/pratos" className="navbar-brand">
          VarMenu
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/pratos"} className="nav-link">
              Pratos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/pratos"} element={<PratoList />} />
          <Route exact path="/add" element={<AddPrato />} />
          <Route path="/pratos/:id" element={<Prato />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;