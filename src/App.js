import React, { useState, useEffect, useContext } from "react";
import './App.css';

import { UserContext } from "./Provider/UserProvider"

import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/LogIn"
import Overview from "./Components/Overview"
import Users from "./Components/Users";
import User from "./Components/Users/User";
import Pending from "./Components/Users/PendingUsers";
import Pages from "./Components/Pages"
import Materials from "./Components/Materials"
import Group from "./Components/Groups";
import Trends from "./Components/Trends"
import Schools from "./Components/Schools"
import Gists from "./Components/Gists";
import Campaign from "./Components/Campaign";
import Search from "./Components/Search"
import SchoolRoute from "./Components/SchoolRoute"
import CampaignInfo from "./Components/CampaignInfo"
import NewAdmin from "./Components/NewAdmin"
import DepartmentUsers from "./Components/DepartmentUsers"
import "./proxima_ssv//Proxima Nova Alt Bold.otf"
import "./proxima_ssv//Proxima Nova Alt Light.otf"
import "./proxima_ssv//Proxima Nova Alt Thin.otf"
import "./proxima_ssv//Proxima Nova Black.otf"
import "./proxima_ssv//Proxima Nova Bold.otf"
import "./proxima_ssv//Proxima Nova Extrabold.otf"
import "./proxima_ssv//Proxima Nova Thin.otf"
import "./proxima_ssv//ProximaNova-Regular.otf"



import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"


import { auth } from "./Firebase/firebase"
import Faculty from "./Components/Faculty";
import Admin from "./Components/Admin";
import UserInfo from "./Components/UserInfo";



function App() {

  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        setLoaded(true)
        setLoggedIn(false)
      }
      else {
        setLoaded(true)
        setLoggedIn(true)
      }
    })
  })

  if (!loaded) {
    return (
      <div></div>
    )
  }


  if (!loggedIn) {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/overview" /></Route>
        <Route exact path="/overview" component={() => <Overview />} />
        <Route exact path="/users" component={() => <Users />} />
        <Route exact path="/users/pending" component={() => <Pending />} />
        <Route exact path="/users/:userid" component={User} />
        <Route exact path="/user/:userid" component={UserInfo} />
        <Route exact path="/pages" component={Pages} />
        <Route exact path="/materials" component={Materials} />
        <Route exact path="/gists" component={Gists} />
        <Route exact path="/schools" component={Schools} />
        <Route exact path="/schools/:schoolname/:faculty" component={Faculty} />
        <Route exact path="/schools/:schoolname/:faculty/:department" component={DepartmentUsers} />
        <Route exact path="/schools/:schoolname" component={SchoolRoute} />
        <Route exact path="/trends" component={Trends} />
        <Route exact path="/group" component={Group} />
        <Route exact path="/campaign" component={Campaign} />
        <Route exact path="/campaign/:campaignid" component={CampaignInfo} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/create" component={NewAdmin} />
      </Switch>
    </Router>
  )
}
export default App;

