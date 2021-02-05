import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home'
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Account from '../../pages/Account';
import Watchlist from '../../pages/Watchlist';
const index = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profil"  exact component={Profil}/>
                <Route path="/trending" exact component={Trending}/>
                <Route path="/account" exact component={Account}/>
                <Route path="/watchlist" exact component={Watchlist}/>

                <Redirect to="/" />
            </Switch>
        </Router>
    )
};

export default index;