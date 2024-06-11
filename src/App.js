import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm'
import Header from "./components/Header";
import Welcome from "./components/Welcome";

const App = () => {
  return (
      <Router>
        <Header/>
        <Switch>
          <Route path="/" component={AuthForm} exact />
          <Route path="/welcome" component={Welcome} exact />
        </Switch>
      </Router>
  );
};

export default App;