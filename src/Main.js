import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import TransactionHistory from "./components/TransactionHistory";

const Main = () => {
  return (
    <div style={{ flexGrow: 1, display: "flex" }}>
      <Switch>
        <Route exact path="/" component={TransactionHistory} />
      </Switch>
    </div>
  );
};

export default Main;
