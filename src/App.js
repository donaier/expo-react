import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ExpoItems } from './expo/expo_items.js';
import { ExpoItem } from './expo/expo_item.js';

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
