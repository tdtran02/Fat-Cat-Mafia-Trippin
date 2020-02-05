import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Email from "./components/ValidateEmail";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";

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
                <Link to="/login">Sign in</Link>
              </li>
              <li>
                <Link to="/MyAccount">My Account</Link>
              </li>
              <li>
                <Link to="/email">Email</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/my account">
              <MyAccount />
            </Route>
            <Route path="/email">
              <Email />
            </Route>

            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
