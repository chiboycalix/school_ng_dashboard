import React, { useEffect, useState } from 'react'
import './Header.scss'
import { BellIcon, EmailNotificationIconOn, SearchIcon } from '../../assest/icons'
import { ProfileImage } from '../../assest/images'
import { MenuOutlined } from '@ant-design/icons'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { auth, firestore } from '../../Firebase/firebase'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
        className="avatar-dropdown-link"
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >

        {children}
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                {children}
            </div>
        );
    },
);

const Header = ({ toggler }) => {

    const [currentUser, setCurrentUser] = useState(null)


    useEffect(() => {
        auth.onAuthStateChanged(({ displayName, photoURL, email, phoneNumber }) => {
            firestore.collection("Admin").get()
                .then((querySnapshot) => {
                    const adminArr = []
                    querySnapshot.forEach((doc) => {
                        adminArr.push(doc.data())
                    });
                    const value = adminArr.filter(value => value.email === email)
                    setCurrentUser({ displayName, photoURL, email, phoneNumber, image: value[0]?.image })
                })
        })

    }, [])
    return (
        <div className="header">
            <div className="search-area">
                <MenuOutlined onClick={toggler} className="hamburger-bar" />
                <img src={SearchIcon} alt="search-icon" />
                <input placeholder="Search here" />
            </div>
            <div className="notification-area">
                <div className="email-notification">
                    <img src={EmailNotificationIconOn} alt="email" />
                </div>
                <div className="in-app-notification">
                    <p className="number">2</p>
                    <img src={BellIcon} alt="app-notification" />
                </div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <div className="user-avatar">
                            <img src={currentUser?.image ? currentUser?.image : ProfileImage} alt="profile-avatar" />
                            <div className="profile-active-icon" />
                            <span className="user-avatar-name">{currentUser?.displayName}</span>
                            <span className="user-avatar-caret">&#x25bc;</span>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="user-avatar-dropdown" as={CustomMenu}>
                        <div>
                            <Link to="/new-admin">Add New Admin</Link>
                        </div>
                        <div>
                            <Link to="/new-admin">Logout</Link>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Header
