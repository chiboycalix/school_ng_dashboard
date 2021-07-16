import React, { useState } from 'react'
import './BaseMarkUp.scss'
import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'

const BaseMarkUp = ({ children }) => {

    const [toggleSideBar, setToggleSideBar] = useState("hide")
    const onToggleSideBar = () => {
        if (toggleSideBar === "hide") { setToggleSideBar("show") }
        else { setToggleSideBar("hide") }
    }
    return (
        <div className="dashboard">
            <Header toggler={onToggleSideBar} />
            <Navigation toggle={toggleSideBar} />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default BaseMarkUp
