import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error404 from './error404.js'
import Home from './home.js'
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" component={Home}/>
    <Route path="*" component={Error404} />
    </Switch>
    </BrowserRouter>
    );
  }
  
  export default App;
  