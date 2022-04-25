import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ExpoItems } from './expo/expo_items.js';
import { ExpoItem } from './expo/expo_item.js';
import { HomeHero } from './general/home_hero.js';
import { Footer } from './general/footer.js';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={`/expo/:expoItemSlug`}>
          <ExpoItem />
        </Route>
        <Route path="/expo">
          <ExpoItems />
        </Route>
        <Route path="/">
          <HomeHero />
          <ExpoItems />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}
