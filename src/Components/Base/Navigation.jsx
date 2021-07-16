import PropTypes from "prop-types";
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogoWhite } from '../../assest/icons'
import './Navigation.scss'

const Navigation = ({ toggle }) => {
    const { pathname } = useLocation()

    const active = (page) => {
        return pathname.includes(page) ? "active" : "";
    }
    return (
        <div className={`navigation ${toggle}`}>
            <div className="logo-section">
                <img src={LogoWhite} alt="logo" />
                School.ng
            </div>

            <div className="navigation-links">
                <Link className={active("/overview")} to="/overview">Overview</Link>
                <Link to="/users" className={active("/users")}>Users</Link>
                <Link to="/pages" className={active("/pages")}>Pages</Link>
                <Link to="/gists" className={active("/gists")}>Gists</Link>
                <Link to="/materials" className={active("/materials")}>Materials</Link>
                <Link to="/campaign" className={active("/campaign")}>Campaign</Link>
                <Link to="/group" className={active("/group")}>Group</Link>
                <Link to="/schools" className={active("/schools")}>Schools</Link>
                <Link to="/trends" className={active("/trends")}>Trends</Link>
                <Link to="/admin" className={active("/admin")}>Admin</Link>
            </div>
        </div>
    )
}

Navigation.propTypes = {
    toggle: PropTypes.string.isRequired
}

export default Navigation
