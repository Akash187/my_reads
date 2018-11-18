import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AllRead from '../read/AllReads';
import Search from '../search/Search';
 // or whatever the location is

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={AllRead}/>
        <Route exact path="/search" component={Search}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;