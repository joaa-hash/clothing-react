import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route path={`/checkout/:id`} component={Checkout} /> */}
    </Switch>
)