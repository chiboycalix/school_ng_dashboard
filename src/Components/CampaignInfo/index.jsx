import React, { useState, useEffect } from 'react'
import "./campaignInfo.css"

import { Container, Col, Row, Modal, Button } from "react-bootstrap"
import CurrencyFormat from "react-currency-format"

import fire from "../../Firebase/firebase"
import Spinner from "../Spinner"
import ImageModal from "../ImageModal"
import HeaderNav from '../HeaderNav'

function CampaignInfo(props) {
    const [campaigns, setCampaigns] = useState();
    const [loading, setLoading] = useState(false)
    const [show, setShow] = React.useState(false);
    const [ids, setIds] = useState()

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIds(id)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            var campaignRef = await fire.database().ref().child("CAMPAIGN")
            campaignRef.on('value', snap => {
                const campaign = snap.val();
                const campaignList = [];
                for (let m in campaign) {
                    campaignList.push(campaign[m]);
                }
                setCampaigns(campaignList);
                setLoading(false)
            })

        }
        fetchUsers()

    }, [])




    const backClick = () => {
        return window.location.href = '/campaign'
    }

    // if (loading) {
    //     return <Spinner />;
    // }





    return (
        <div>
            <HeaderNav />

            {
                loading ? <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                    (
                        <div>
                        <div className="app-div">
                            <div className="user-info-page">
                                <p style={{ cursor: "pointer", width: '150px' }} onClick={() => backClick()}><span><img src="https://img.icons8.com/ios-glyphs/24/000000/arrow-pointing-left--v2.png" alt="" /></span> Back</p>
        
                                {
                                    campaigns && campaigns.map(user => {
                                        return user.id === props.match.params.campaignid ? (
        
                                            <Container fluid>
                                                <Row>
                                                    <Col lg="3">
                                                        <div className="user-info-div1">
                                                            <div className="camps">
                                                                <div className="info-image-div">
                                                                    <img src={user.postContent.bizzpost.cover_photo} alt="" className="users-info-image" />
                                                                </div>
        
                                                                <h4 className="info-header">{user.postContent.user.username}</h4>
                                                                <p className="info-text">{user.postContent.user.institution}</p>
                                                                <p className="info-text">{user.postContent.user.dept}</p>
                                                                <p></p>
                                                            </div>
        
                                                            <div className="breakpoint">
                                                                <div>
                                                                    <p className="info-span">Business Owner<br /><span className="info-text">{user.bizz.name}</span></p>
                                                                    <p className="info-span">Plan<br /><span className="info-text">{user.plan}</span></p>
                                                                    <p className="info-span">Duration<br /><span className="info-text">{user.duration}</span></p>
                                                                    <p className="info-span">No. Of Comments<br /><span className="info-text">{user.stats ? user.stats.noOfComments : 0}</span></p>
                                                                    <p className="info-span">No. Of Likes<br /><span className="info-text">{user.stats ? user.stats.noOfLikes : 0}</span></p>
                                                                    <p className="info-span">No. Of Regist<br /><span className="info-text">{user.stats ? user.stats.noOfRegist : 0}</span></p>
                                                                    <p className="info-span">ClicksToPage<br /><span className="info-text">{user.stats ? user.stats.clicksToPage : 0}</span></p>
                                                                    <p className="info-span">PhotoView<br /><span className="info-text">{user.stats ? user.stats.photoViews : 0}</span></p>
                                                                    <p className="info-span">VideoView<br /><span className="info-text">{user.stats ? user.stats.VideoViews : 0}</span></p>
                                                                    <p className="info-span">Date Created<br /><span className="info-text">{new Date(user.date).toUTCString()}</span></p>
        
                                                                </div>
                                                                <div>
                                                                    <p className="info-span">University</p>
                                                                    <select className="select-conts">
                                                                        {
                                                                            Object.values(user.schools).map(sch =>
                                                                                <option>{sch}</option>
                                                                            )
        
                                                                        }
                                                                    </select>
                                                                    <p className="info-span mt-3 bottom">Price</p>
                                                                    <p className="info-text2">&#8358;<CurrencyFormat value={user.price} displayType={'text'} thousandSeparator={true} style={{ marginLeft: "0%" }} /></p>
        
                                                                </div>
        
        
        
                                                            </div>
                                                        </div>
        
        
                                                    </Col>
        
                                                    <Col lg="9">
                                                        <div className="campaign2">
                                                            <h3 className="content-header">{user.postContent.user.username}</h3>
                                                            <p className="content-header">{user.postContent.text}</p>
                                                            <div className="array-img">
                                                                {
                                                                    Object.values(user.postContent.imgarray).map((imgs, i) => {
                                                                        return <div className="arr">
                                                                            <div>
                                                                                <img src={imgs.imgurl} onClick={() => handleShow(i)} alt={i + 1} className="second-display" />
                                                                            </div>
        
        
        
        
                                                                            <ImageModal
                                                                                shows={show}
                                                                                onHides={() => setShow(false)}
                                                                                id={ids}
                                                                                user={user}
        
                                                                            />
                                                                        </div>
                                                                    })
                                                                }
                                                            </div>
        
                                                        </div>
                                                    </Col>
        
                                                </Row>
                                            </Container>
                                        ) : ""
                                    })
                                }
                            </div>
                        </div>
        
                    </div>
                )
            }
           
        </div>
    )
}

export default CampaignInfo
