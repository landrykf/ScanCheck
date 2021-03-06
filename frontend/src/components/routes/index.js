import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Account from "../../pages/Account";
import Watchlist from "../../pages/Watchlist";
import { Add } from "../Mangalist/Add";
//part2
import { GlobalProvider } from "../../context/GlobalState";
import Explorer from "../../pages/Explorer";
import MoreInfo from "../../pages/MoreInfo";
import { MangaView } from "../CreateManga/MangaView";

const index = () => {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
          <Route path="/account" exact component={Account} />
          <Route path="/watchlist" exact component={Watchlist} />
          <Route path="/add" exact component={Add} />
          <Route path="/explorer" exact component={Explorer} />
          <Route path="/detail" exact component={MoreInfo} />
          <Route path="/favorite" exact component={MangaView} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </GlobalProvider>
  );
};

export default index;
