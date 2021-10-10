import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { ExpoItem, ExpoItems } from './expo/expo_items.js';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={`/expo/:expoItemHandle`}>
            <ExpoItem />
          </Route>
          <Route path="/expo">
            <ExpoItems />
          </Route>
          <Route path="/">
            <ExpoItems />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
