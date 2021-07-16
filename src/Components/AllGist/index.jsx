import React, { useState, useEffect } from "react"
import "./allgist.css"

import fire, { firestore } from "../../Firebase/firebase"
import { Container, Row, Col } from "react-bootstrap"
import Pagination from "../Pagination"
import ShowMoreText from "react-show-more-text"
import GistModal from "../GistModal"


const AllGist = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(3)
    const [modalShow, setModalShow] = useState(false);
    const [gistId, setGistId] = useState('');
    const [flag, setFlag] = useState()


    useEffect(() => {
        var FlagRef = fire.database().ref().child("Flagged Gist")
        FlagRef.on('value', snap => {
            const flag = snap.val();
            const allFlag = flag.All
            const flagList = [];
            flagList.push(allFlag)
            setFlag(flagList)
        })



    }, [])


    const sendFlag = []
    flag && flag.map(fs => Object.values(fs).map(fd => sendFlag.push(fd.postid)))



    var mts = users.Posts ? Object.values(users.Posts).length : undefined

    const currentPosts = users.Posts && Object.values(users.Posts)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    const handleGist = (id) => {
        setModalShow(true)
        setGistId(id)
    }

    const postComment = (id) => {
        if (users["Post Comments"]) {
            return Object.entries(users["Post Comments"]).map(ab => {
                if (ab[0]) {
                    if (ab[0] === id) {
                        const bb = Object.values(ab[1]).length
                        return bb
                    } else if (!ab[0].includes(id)) {
                        return null
                    }    
                } else {
                    return 0
                }

            })
        } else {
            return 0
        }
    }

    const postLikes = (id) => {
        if (users.PostLikes) {
            return Object.entries(users.PostLikes).map(ab => {
                if (ab[0]) {
                    if (ab[0] === id) {
                        const bb = Object.values(ab[1]).length
                        return bb
                    }
                    else if (!ab[0].includes(id)) {
                        return null
                    }
                } else {
                    return 0
                }

            })
        } else {
            return 0
        }
    }

    const repost = (id) => {
        if (users.Repost) {
            return Object.entries(users.Repost).map(ab => {
                if (ab[0]) {
                    if (ab[0] === id) {
                        const bb = Object.values(ab[1]).length
                        return bb
                    }
                    else if (!ab[0].includes(id)) {
                        return null
                    }

                } else {
                    return 0
                }
            })
        } else {
            return 0;
        }

    }


    return (
        <div className="gest">
            {
                users.Posts ? (
                    <div>

                        {
                            currentPosts.sort((a,b) => b.date - a.date).map(pt => {
                                return <Container fluid>
                                    <Row>
                                        <Col xs="12">
                                            <div className="allgist">

                                                <div className="gimst">
                                                    <div className="allgist-div1" onClick={() => handleGist(pt.postid)}>
                                                        <img src={pt.userDp} alt="" className="gist-image" />
                                                        <div className="allgist-div1-sub">
                                                            <p className="allgist-div1-sub-header">{pt.user.institution}</p>
                                                            <p className="allgist-div1-sub-text">Posted by {pt.user.username}, {new Date(pt.date).toDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="gimst-div">
                                                        <ShowMoreText
                                                            lines={1}
                                                            more='Show more'
                                                            less='Show less'
                                                            className='content'
                                                            anchorClass='my-anchor-css-class pt'
                                                            onClick={executeOnClick}
                                                            expanded={false}
                                                            width={700}
                                                        >
                                                            <p className="textss">{pt.text}</p>
                                                        </ShowMoreText>
                                                    </div>

                                                    <div className="action">
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                            <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                                                            <p className="list">{postComment(pt.postid)} comment</p>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                            <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                                                            <p className="list">{postLikes(pt.postid)} like</p>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                            <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                                                            <p className="list">{repost(pt.postid)} Regist</p>
                                                        </div>
                                                    </div>
                                                </div>




                                                {/* <div>
                                                    <img src={pt.userDp} alt="" className="allround-image" />
                                                </div> */}
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    {
                                                        pt.videourl ?
                                                            <video className="vmd" controls>
                                                                <source src={pt.videourl} type="video/mp4" />
                                                            </video>
                                                            : pt.imgarray ? <img src={pt.imgarray[0].imgurl} alt="" className="allround-image" /> : ""
                                                    }

                                                    {sendFlag.includes(pt.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* <GistModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        id={gistId}
                                        schools={pt.user.institution}
                                        // flag={sendFlag}
                                        selectedGist={pt.user.institution}
                                      /> */}

                                </Container>

                            }
                            )

                        }

                    </div>

                )


                    : <p style={{ textAlign: 'center' }}>You Have No Gist</p>
            }
        </div>
    )
}

export default AllGist