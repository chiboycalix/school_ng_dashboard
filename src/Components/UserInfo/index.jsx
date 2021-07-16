import React, { useEffect, useState } from 'react'

import "./userInfo.scss"

import { Container, Col, Row, Tabs, Tab, Modal, Button } from "react-bootstrap"


import AllGist from "../AllGist"
import Peers from "../Peers"

import fire, { tokens } from "../../Firebase/firebase"
import PeerGroup from '../PeerGroup'
import Notification from "../Notification"
import Business from "../Business"
import Spinner from "../Spinner"
import PeerRequest from '../PeerRequest'
import HeaderNav from '../HeaderNav'
import BaseMarkUp from '../Base/BaseMarkUp'



function UserInfo(props) {


    console.log({ props })

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tokenid = tokens
    console.log("🚀 ~ file: index.jsx ~ line 36 ~ UserInfo ~ tokens", tokens)



    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            var userRef = await fire.database().ref().child("Users")
            userRef.on('value', snap => {
                const user = snap.val();
                const userList = [];
                for (let m in user) {
                    userList.push(user[m]);
                }
                setUsers(userList);
                setLoading(false)
            })

        }
        fetchUsers()

    }, [])




    const backClick = () => {
        return window.location.href = '/users'
    }

    // if (loading) {
    //     return <Spinner />;
    // }


    const sendPush = (email) => {
        const recipient = email;

        // Getting From Data when button clicked
        const token = tokenid[0];
        const notificationBody = mail;

        // Adding data to payload for sending push notifications
        let body = {
            to: token,
            notification: {
                body: notificationBody,
                click_action: "/",
            }
        };

        const options = {
            method: "POST",
            headers: new Headers({
                // Add your server key after key=
                Authorization: "key=AAAApdxljRk:APA91bH3HxOyY8B2yJjT9XG93RiyfR6mixuTB673tWoItmOzzs1WEfMSCUiSLxNJeREdxzIYjt82CXdUOaXPmmrIAGEwUeBB1xIoFPssWS6oiBnX9rKfoSkuj7-JgYYl7sI4TaqZKKRSZ4P02h41PO020bNhCwtlTw",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body)
        };

        // Sending Push notifications to user using fetch api
        fetch("https://fcm.googleapis.com/fcm/send", options)
            .then(res => res.json())
            .then(data => {
                if (data.failure === 1) {
                    alert("Token Expired");
                } else {
                    alert("Send Success");
                }
            })
            .catch(err => {
                alert(err);
            });
    }




    return (

        <BaseMarkUp>
    
            {
                loading ? <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                    (
                        <div>
                            <div className="user-info-page">
                                <p style={{ cursor: "pointer", width: '150px' }} onClick={() => backClick()}><span><img src="https://img.icons8.com/ios-glyphs/24/000000/arrow-pointing-left--v2.png" /></span> Back</p>

                                {
                                    users && users.map(user => {
                                        return user.Profile ? (
                                            user.Profile.id === props.match.params.userid ? (
                                                <Container fluid>
                                                    <Row>
                                                        <Col lg="3">
                                                            <div className="user-info-div1">
                                                                <div>
                                                                    <div className="info-image-div">
                                                                        <img src={user.Profile.image} alt="" className="users-info-image" />
                                                                    </div>

                                                                    <h4 className="info-header">{user.Profile.username}</h4>
                                                                    <p></p>
                                                                    <div className="mail-div">
                                                                        <img src="https://img.icons8.com/ios-glyphs/35/D64400/appointment-reminders--v2.png" alt="" />
                                                                        <a href={"mailto:" + user.Profile.email} className="mail" onClick={handleShow}>Send mail</a>
                                                                    </div>
                                                                </div>


                                                                <div className="breakpoint">
                                                                    <div>
                                                                        <p className="info-span">Username<br /><span className="info-text">{user.Profile.username}</span></p>
                                                                        <p className="info-span">Email<br /><span className="info-text">{user.Profile.email}</span></p>
                                                                        <p className="info-span">University<br /><span className="info-text">{user.Profile.institution}</span></p>
                                                                        <p className="info-span">Total Stars<br /><span className="info-text">{user["Total Stars"] ? user["Total Stars"].count : 0}</span></p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="info-span">Faculty<br /><span className="info-text">{user.Profile.faculty}</span></p>
                                                                        <p className="info-span">Department<br /><span className="info-text">{user.Profile.dept}</span></p>
                                                                        <p className="info-span">Followers<br /><span className="info-text">{user.Peers ? Object.keys(user.Peers).length : 0}</span></p>
                                                                        <p className="info-span">App Version<br /><span className="info-text">Not Available</span></p>
                                                                    </div>


                                                                </div>
                                                            </div>


                                                        </Col>

                                                        <Col lg="9">
                                                            <div className="lists">
                                                                <Tabs defaultActiveKey="All Gist" id="uncontrolled-tab-example" className="tab-list">
                                                                    <Tab eventKey="All Gist" title="All Gist" className="">
                                                                        <AllGist users={user} />
                                                                    </Tab>
                                                                    <Tab eventKey="Peers" title="Peers">
                                                                        <Peers users={user} />
                                                                    </Tab>
                                                                    <Tab eventKey="Group" title="Group">
                                                                        <PeerGroup users={user} />
                                                                    </Tab>
                                                                    <Tab eventKey="Business" title="Business">
                                                                        <Business users={user} />
                                                                    </Tab>
                                                                    <Tab eventKey="Peer Request" title="Peer Request">
                                                                        <PeerRequest users={user} />
                                                                    </Tab>
                                                                </Tabs>

                                                            </div>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            ) : undefined
                                        ) : ""
                                    })
                                }
                            </div>
                        </div>
                    )
            }




        </BaseMarkUp>

    )
}

export default UserInfo
