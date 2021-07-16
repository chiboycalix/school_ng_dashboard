import React, {useState, useContext} from "react"
import HeaderNav from "../../Components/HeaderNav"
import {UserContext} from "../../Provider/UserProvider"
import Overview from "../../Components/Overview"
import Users from "../../Components/Users"
import "./dashboard.css"

import {Spinner} from "react-bootstrap"


const Dashboard = (props) => {
    const user = useContext(UserContext);

   
    if (user === null) {
        return <Spinner animation="border" variant="primary" />
    }


    return (
        <div className="sideNav-component">
            <HeaderNav />

            <div className="app-div">
               
            </div>
        </div>
    )
}

export default Dashboard;