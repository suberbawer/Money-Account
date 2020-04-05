import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Components
import Main from "./Main";
// Styles

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Main />
      </div>
    </Router>
  );
};

export default App;
