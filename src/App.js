import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm'
import Header from "./components/Header";

const App = () => {
  return (
      <Router>
        <Header/>
        <Switch>
          <Route path="/" component={AuthForm} exact />
        </Switch>
      </Router>
  );
};

export default App;