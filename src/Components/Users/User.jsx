import React, { useEffect, useState } from 'react'

import "./user.scss"

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
import BackButton from '../BackButton/BackButton'
import { useHistory, useParams } from 'react-router'
import Avatar from 'antd/lib/avatar/avatar'
import { DotsIconRed, EmailIconRed, Like, Regist, Comment } from '../../assest/icons'
import { Table, Tooltip } from 'antd'



function User(props) {
    const { goBack } = useHistory()
    const { userid } = useParams()

    const [user, setUser] = useState({ profile: {}, peers: [], posts: [], comments: [], likes: [], regist: [], peerRequest: [] });
    const [activeTab, setActiveTab] = useState(1)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tokenid = tokens



    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            var userRef = await fire.database().ref().child("Users").child(userid)
            userRef.on('value', snap => {
                const userInstance = snap.val();
                const peers = [];
                const posts = [];
                const comments = [];
                const likes = [];
                const peerRequest = [];
                const regist = [];
                for (let m in userInstance?.Peers) {
                    peers.push(userInstance?.Peers[m].user);
                }
                for (let m in userInstance?.Posts) {
                    posts.push(userInstance?.Posts[m]);
                }
                for (let m in userInstance?.["sent peer request"]) {
                    peerRequest.push(userInstance?.["sent peer request"]?.[m]);
                }
                for (let m in userInstance?.PostLikes) {
                    likes.push({ id: m, length: Object.keys(userInstance?.PostLikes[m]).length });
                }
                for (let m in userInstance?.["Post Comments"]) {
                    comments.push({ id: m, length: Object.keys(userInstance?.["Post Comments"]?.[m]).length });
                }
                for (let m in userInstance?.["all_re_post"]) {
                    regist.push({ id: m, length: Object.keys(userInstance?.["all_re_post"]?.[m]).length });
                }
                setUser({
                    ...user, profile: {
                        ...userInstance.Profile,
                        version: userInstance?.AppVersion,
                        stars: userInstance?.["Total Stars"]?.count
                    }, peers, posts, comments, likes, regist, peerRequest
                });
                setLoading(false)
            })

        }
        fetchUsers()

    }, [])


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

    const postLikes = (id) => {
        let likes = 0;
        const like = user.likes.find(value => value.id === id)
        likes = like?.length || 0
        return `${likes} ${likes > 1 ? "Likes" : "Like"}`
    }
    const postComments = (id) => {
        let comments = 0;
        const comment = user.comments.find(value => value.id === id)
        comments = comment?.length || 0
        return `${comments} ${comments > 1 ? "Comments" : "Comment"}`
    }
    const postRegist = (id) => {
        let regists = 0;
        const regist = user.regist.find(value => value.id === id)
        regists = regist?.length || 0
        return `${regists} ${regists > 1 ? "Regists" : "Regist"}`
    }


    const peerColumn = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "School",
            dataIndex: "institution",
            key: "institution",
        },
        {
            title: "Department",
            dataIndex: "dept",
            key: "department",
        }
    ]


    return (

        <BaseMarkUp>
            <div className="single-user-page">
                <BackButton back={goBack} />

                {!loading && <div className="body-container">
                    <div className="user-details-section">
                        <div className="avatar-section">
                            <Avatar size={150} src={user?.profile?.image} />
                            <p className="username">{user?.profile?.fullName}</p>
                            <a href={`mailto:${user?.profile?.email}`} type="link" className="action_button_email">
                                <img src={EmailIconRed} alt="send-email" /> Send Email
                            </a>
                        </div>
                        <hr className="hr" />

                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <p>Username:</p>
                                    <p className="bold-content">{user?.profile?.username}</p>
                                </div>
                                <div>
                                    <p>Total Stars:</p>
                                    <p className="bold-content">{user?.profile?.stars}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <p>Email:</p>
                                    <Tooltip title={user?.profile?.email}>
                                        <p className="bold-content  truncate">{user?.profile?.email}</p>
                                    </Tooltip>
                                </div>
                                <div>
                                    <p>Followers:</p>
                                    <p className="bold-content">0</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <p>University:</p>
                                <p className="bold-content">{user?.profile?.institution}</p>
                            </div>
                            <div className="col-md-12">
                                <p>Department:</p>
                                <p className="bold-content">{user?.profile?.dept}</p>
                            </div>
                            <div className="col-md-12">
                                <p>Faculty:</p>
                                <p className="bold-content">{user?.profile?.faculty}</p>
                            </div>
                            <div className="col-md-12">
                                <p>Version:</p>
                                <p className="bold-content">{user?.profile?.version}</p>
                            </div>
                        </div>
                    </div>

                    <div className="other-section">
                        <div className="tab-header-container">
                            <div
                                onClick={() => setActiveTab(1)}
                                className={`tab-header ${activeTab === 1 ? "active-header" : ""}`}
                            >
                                <p>All Gists</p>
                                <img src={DotsIconRed} alt="all-gist" />
                            </div>
                            <div onClick={() => setActiveTab(2)} className={`tab-header ${activeTab === 2 ? "active-header" : ""}`}>
                                <p>Peer</p>
                                <img src={DotsIconRed} alt="peer" /></div>
                            <div onClick={() => setActiveTab(3)} className={`tab-header ${activeTab === 3 ? "active-header" : ""}`}>
                                <p>Group</p>
                                <img src={DotsIconRed} alt="Group" />
                            </div>
                            <div onClick={() => setActiveTab(4)} className={`tab-header ${activeTab === 4 ? "active-header" : ""}`}>
                                <p>Business</p>
                                <img src={DotsIconRed} alt="Business" />
                            </div>
                            <div onClick={() => setActiveTab(5)} className={`tab-header ${activeTab === 5 ? "active-header" : ""}`}>
                                <p>Peer Request</p>
                                <img src={DotsIconRed} alt="Peer Request" />
                            </div>
                        </div>

                        <div className="tab-content-container">
                            <div className={`content ${activeTab === 1 ? "active-content" : ""}`}>
                                <div className="all-gists-section">
                                    {user.posts.map(value =>
                                        <div className="gist">
                                            <div className="left-section">
                                                <div className="avatar-section">
                                                    <Avatar size={40} src={value?.user?.image} />
                                                </div>
                                                <div className="text-section">
                                                    <p className="gist-author">@{value?.username}</p>
                                                    <p className="posted-date">Posted on {new Date(value?.date).toDateString()}</p>
                                                    <p className="gist-content">
                                                        {value?.text}
                                                    </p>

                                                    <div className="stats-section">
                                                        <div className="stat-content">
                                                            <img src={Like} alt="likes" /> <span>{postLikes(value.postid)}</span>
                                                        </div>
                                                        <div className="stat-content">
                                                            <img src={Comment} alt="comments" /> <span>{postComments(value.postid)}</span>
                                                        </div>
                                                        <div className="stat-content">
                                                            <img src={Regist} alt="regist" /> <span>{postRegist(value.postid)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="image-section">
                                                {value.imgarray?.length && <img src={value?.imgarray?.[0]?.imgurl} alt="placeholder" />}
                                                {value.videourl?.length && <video width="150" height="150" controls>
                                                    <source src={value.videourl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`content ${activeTab === 2 ? "active-content" : ""}`}>
                                <div className="peer-section">
                                    <Table columns={peerColumn} dataSource={user?.peers} pagination={false} />
                                </div>
                            </div>
                            <div className={`content ${activeTab === 3 ? "active-content" : ""}`}>
                                Hello
                            </div>
                            <div className={`content ${activeTab === 4 ? "active-content" : ""}`}>
                                Hello
                            </div>
                            <div className={`content ${activeTab === 5 ? "active-content" : ""}`}>
                                <div className="peer-section">
                                    <Table columns={peerColumn} dataSource={user?.peerRequest} pagination={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }</div>
        </BaseMarkUp >

    )
}

export default User
