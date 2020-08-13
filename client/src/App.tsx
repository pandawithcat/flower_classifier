import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Main />} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
