import React, { useState, useEffect } from 'react'
import "./campaign.css"

import { Table, OverlayTrigger, Popover } from "react-bootstrap"
import Spinner from "../Spinner"
import fire from "../../Firebase/firebase"
import Pagination from "../Pagination"
import CurrencyFormat from 'react-currency-format'
import HeaderNav from '../HeaderNav'
import BaseMarkUp from '../Base/BaseMarkUp'


function Campaign() {
    const [campaign, setCampaign] = useState()
    const [sort, setSort] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(15)



    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = campaign && campaign


    const mts = campaign && campaign.length

    const paginate = pageNumber => setCurrentPage(pageNumber);


    const price = campaign && campaign.reduce((total, pr) => total = total + parseInt(pr.price, 10), 0)





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
                campaignList.map(camp => {
                    if (camp.duration === "1 Day") {
                        const currentDate = new Date()
                        const campaignDate = new Date(camp.date + (3600 * 1000 * 24)).toDateString();
                        if (Date.parse(currentDate) <= Date.parse(campaignDate)) {
                            return;
                        } else {
                            campaignRef.child(camp.id).update({
                                "status": false
                            })
                        }

                    } else if (camp.duration === "1 Week") {
                        const currentDate = new Date()
                        const campaignDate = new Date(camp.date + (3600 * 1000 * 168)).toDateString();
                        if (Date.parse(currentDate) <= Date.parse(campaignDate)) {
                            return;
                        } else {
                            campaignRef.child(camp.id).update({
                                "status": false
                            })
                        }
                    } else {
                        const currentDate = new Date()
                        const campaignDate = new Date(camp.date + (3600 * 1000 * 744)).toDateString()
                        if (Date.parse(currentDate) <= Date.parse(campaignDate)) {
                            return;
                        } else {
                            campaignRef.child(camp.id).update({
                                "status": false
                            })
                        }
                    }
                })
                setCampaign(campaignList);
                setLoading(false)
            })

        }
        fetchUsers()


    }, [])

    // if (loading) {
    //     return <Spinner />
    // }

    const handleClick = (id) => {
        return window.location.href = `/campaign/${id}`
    }



    return (
       <BaseMarkUp>
            <div className="app-div">
                <div className="users-section">
                    <div className="search-div">
                        <h1 className="amount">Total Amount: &#8358;<CurrencyFormat value={price} displayType={'text'} thousandSeparator={true}  style={{marginLeft: "-1%"}}/></h1>
                        <div className="trigger">
                            <OverlayTrigger
                                trigger="click"
                                key={"left"}
                                placement={"bottom"}
                                overlay={
                                    <Popover id={`popover-positioned-left`} className="toolspit">
                                        <Popover.Title as="h3" className="inst-header">Sort by</Popover.Title>
                                        <Popover.Content>
                                            <p className="sort" onClick={() => setSort(true)}>Ascending</p>
                                            <p className="sort" onClick={() => setSort(false)}>Descending</p>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <p className="sort"><img src="https://img.icons8.com/ios-glyphs/24/F07841/sorting-answers.png" alt="" /> Sort</p>
                            </OverlayTrigger>
                            <input type="search" placeholder="Search by Admin" className="search-inp" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th className="username">Admin</th>
                                <th className="email">No of School</th>
                                <th className="school">Price</th>
                                <th className="dept">Date Created</th>
                                <th className="status-mat">Duration</th>
                                <th className="gp-type-mat">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                loading ?  <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                                (sort ?
                                    (
                                        campaign && campaign.filter(cr => cr.postContent.user.username.toLowerCase().includes(searchValue.toLowerCase())).sort((a, b) => (a.postContent.user.username.localeCompare(b.postContent.user.username))).map((camp, i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td className="bus-name" style={{ cursor: 'pointer' }} onClick={() => handleClick(camp.id)}>{camp.postContent.user.username}</td>
                                                <td className="bus-name">{camp.schools.length}</td>
                                                <td className="bus-name">&#8358;<CurrencyFormat value={camp.price} displayType={'text'} thousandSeparator={true} style={{marginLeft: "-1%"}}/></td>
                                                <td className="bus-name">{new Date(camp.date).toUTCString()}</td>
                                                <td className="bus-name">{camp.duration}</td>
                                                <td className="bus-name">{camp.status ? <p className="success">Active</p> : <p className="danger">Expired</p>}</td>
                                            </tr>
                                        })
                                    )
                                    :
                                    (
                                        campaign && campaign.filter(cr => cr.postContent.user.username.toLowerCase().includes(searchValue.toLowerCase())).reverse().map((camp, i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td className="bus-name" style={{ cursor: 'pointer' }} onClick={() => handleClick(camp.id)}>{camp.postContent.user.username}</td>
                                                <td className="bus-name">{camp.schools.length}</td>
                                                <td className="bus-name">&#8358;<CurrencyFormat value={camp.price} displayType={'text'} thousandSeparator={true} style={{marginLeft: "0%"}}/></td>
                                                <td className="bus-name">{new Date(camp.date).toUTCString()}</td>
                                                <td className="bus-name">{camp.duration}</td>
                                                <td className="bus-name">{camp.status ? <p className="success">Active</p> : <p className="danger">Expired</p>}</td>
                                            </tr>
                                        })
                                    )
                                )
                            }
                        </tbody>
                    </Table>

                </div>
            </div>
       </BaseMarkUp>
    )
}

export default Campaign
