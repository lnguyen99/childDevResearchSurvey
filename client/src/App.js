import React, {useCallback} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

import About from "./components/about.component.js";
import ContactUs from "./components/contact-us.component";
import Homepage from "./components/homepage.component";
import LogIn from "./components/log-in.component"
import Navbar from "./components/navbar.component"
import Study from "./components/study.component";

function App() {
  return (
    <Router>
      <Navbar /> 
      <br/> 
      <div className="container">
        <Route path="/" exact component={Homepage} /> 
        <Route path="/about" component={About}/>
        <Route path="/contact-us" component={ContactUs}/>
        <Route path="/log-in" component={LogIn}/>
        <Route path="/survey" component={Study}/>
      </div>
    </Router>
  );
}

export default App;
