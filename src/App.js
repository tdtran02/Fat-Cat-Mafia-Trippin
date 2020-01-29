import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";

function App() {
  return (
    <div className="App">
      {/* home page */}
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
