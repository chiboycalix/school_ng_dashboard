import React, { useState, useEffect } from "react"
import "./header-nav.css"
import { Nav, NavDropdown, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"

import fire, { auth, firestore } from "../../Firebase/firebase"






const HeaderNav = (props) => {
    const [sidebar, setSidebar] = useState(false)
    const [user, setUser] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState(localStorage.getItem('name') || 'overview');

    useEffect(() => {
        localStorage.setItem('name', name)
        setName(name)

    }, [name])


    useEffect(() => {
        auth.onAuthStateChanged(user => {
        console.log("🚀 ~ file: index.jsx ~ line 31 ~ useEffect ~ user", user)
            var adminRef = firestore.collection("Admin").get()
                .then((querySnapshot) => {

                    var adminArr = []
                    console.log("🚀 ~ file: index.jsx ~ line 35 ~ .then ~ adminArr", adminArr)
                    querySnapshot.forEach((doc) => {
                        adminArr.push(doc.data())
                    });
                    setCurrentUser(user)
                    adminArr?.map(admin => {
                        if (admin.email === user.email) {
                            setUser(admin)
                            
                        }
                    })
                });

        })
    }, [])




    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    const SignOut = async () => {
        await fire.auth().signOut()
    }

    const handleClick = (a) => {
        setName(a)
    }

    return (
        <div>
            <div className="header-nav">
                <div>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className="nav-menu-items" onClick={showSidebar}>
                            <li className="navbar-toggle">
                                <Link to="#" className="menu-bars">
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <li className={window.location.pathname === "/overview" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/overview" className="">Overview</Link>
                            </li>
                            <li className={window.location.pathname === "/users" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/users" className="" >Users</Link>
                            </li>
                            <li className={window.location.pathname === "/pages" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/pages" className="">Pages</Link>
                            </li>
                            <li className={window.location.pathname === "/gists" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/gists" className="" >Gists</Link>
                            </li>
                            <li className={window.location.pathname === "/materials" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/materials" className="" >Materials</Link>
                            </li>
                            <li className={window.location.pathname === "/campaign" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/campaign" className="" >Campaign</Link>
                            </li>
                            <li className={window.location.pathname === "group" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/group" className="" >Group</Link>
                            </li>
                            <li className={window.location.pathname === "/schools" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/schools" className="" >Schools</Link>
                            </li>
                            <li className={window.location.pathname === "/trends" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/trends" className="" >Trends</Link>
                            </li>
                            <li className={window.location.pathname === "/admin" ? " nav-text pactive" : "nav-text"}>
                                <Link to="/admin" className="" >Admin</Link>
                            </li>
                        </ul>
                    </nav>
                    <img src="https://res.cloudinary.com/doouwbecx/image/upload/v1604742745/Schoolng/cir_l_2_w59sua.png" onClick={() => window.location.href = '/'} alt="" style={{ cursor: "pointer" }} />
                </div>

                <div className="header-nav2">
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                        {
                            user?.type === "super" || currentUser?.email === "support@schooln.ng" ?
                                (
                                    <>
                                    <NavDropdown.Item href="/admin/create">Add New Admin</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    </>
                                )
                                : null
                        }
                       
                        <NavDropdown.Item onClick={() => SignOut()}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>


            <div style={{ display: "flex", backgroundColor: '#F7F7F7', height: '100%' }}>

                <div>
                    <div className="sideNav">
                        <div className="sideNav-hr">
                            <div className="sideNav-ul">
                                <Link to="/overview" className={window.location.pathname === "/overview" ? " sideNav-li pactive" : "sideNav-li"} >Overview</Link>
                                <Link to="/users" className={window.location.pathname === "/users" ? " sideNav-li pactive" : "sideNav-li"} >Users</Link>
                                <Link to="/pages" className={window.location.pathname === "/pages" ? " sideNav-li pactive" : "sideNav-li"} >Pages</Link>
                                <Link to="/gists" className={window.location.pathname === "/gists" ? " sideNav-li pactive" : "sideNav-li"} >Gists</Link>
                                <Link to="/materials" className={window.location.pathname === "/materials" ? " sideNav-li pactive" : "sideNav-li"} >Materials</Link>
                                <Link to="/campaign" className={window.location.pathname === "/campaign" ? " sideNav-li pactive" : "sideNav-li"} >Campaign</Link>
                                <Link to="/group" className={window.location.pathname === "/group" ? " sideNav-li pactive" : "sideNav-li"} >Group</Link>
                                <Link to="/schools" className={window.location.pathname === "/schools" ? " sideNav-li pactive" : "sideNav-li"} >Schools</Link>
                                <Link to="/trends" className={window.location.pathname === "/trends" ? " sideNav-li pactive" : "sideNav-li"} >Trends</Link>
                                <Link to="/admin" className={window.location.pathname === "/admin" ? " sideNav-li pactive" : "sideNav-li"} >Admin</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderNav;