import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

import About from "./components/about.component.js";
import ContactUs from "./components/contact-us.component";
import Dashboard from './components/Dashboard'
import Homepage from "./components/homepage.component";
import Navbar from "./components/Navbar"
import Study from "./components/study.component";
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar /> 
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Homepage} /> 
            <Route path="/homepage" component={Homepage} /> 
            <Route path="/about" component={About}/>
            <Route path="/contact-us" component={ContactUs}/>
            <Route path="/survey" component={Study}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
