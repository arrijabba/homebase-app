import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import { DAOsList } from "../pages/daoexplorer/pages/List";
import { DAO } from "../pages/daoexplorer/pages/DAO";
import { Treasury } from "../pages/daoexplorer/pages/Treasury";

export const DAOExplorerRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/daos`}>
        <DAOsList />
      </Route>
      <Route path={`${match.url}/dao/:id`}>
        <DAO />
      </Route>
      <Route path={`${match.url}/treasury/:id`}>
        <Treasury />
      </Route>
      <Redirect to={`${match.url}/daos`} />
    </Switch>
  );
};