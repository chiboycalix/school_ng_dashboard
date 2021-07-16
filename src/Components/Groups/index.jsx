import React, { useState, useEffect } from 'react'
import "./groups.css"

import fire from "../../Firebase/firebase"
// import Spinner from "../Spinner"
import { Table, OverlayTrigger, Popover } from "react-bootstrap"
import Pagination from "../Pagination"
import HeaderNav from '../HeaderNav'
import BaseMarkUp from '../Base/BaseMarkUp'





function Groups() {
    const [groups, setGroups] = useState()
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(15)


    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);
            var groupRef = await fire.database().ref().child("Group")
            groupRef.on('value', snap => {
                const group = snap.val();
                const groupList = [];
                groupList.push(group)
                setGroups(groupList);
                setLoading(false)
            })

            var userRef = await fire.database().ref().child("Users")
            userRef.on('value', snap => {
                const user = snap.val();
                const userList = [];

                for (let m in user) {
                    userList.push(user[m]);
                }
                setUsers(userList);
            })
        }
        fetchDatas()



    }, [])

    // if (loading) {
    //     return <Spinner />
    // }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = groups && groups

    const groupLength = []
    groups && groups.map(group => {
        return groupLength.push(Object.values(group.General).length)
    })
    const mts = groupLength[0]
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <BaseMarkUp>
            <div className="app-div">
                <div className="group-page">
                    <div className="search-div">
                        <h1> </h1>
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
                            <input type="search" placeholder="Search by Group Name" className="search-inp" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>No..</th>
                                    <th></th>
                                    <th className="gp-name">Group Name</th>
                                    <th className="gp-user">Admin Name</th>
                                    <th className="gp-cate">Category</th>
                                    <th className="gp-likes">No of Members</th>
                                    <th className="gp-date">Date Created</th>
                                    <th className="gp-type">Access Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                                        (sort ?
                                            (
                                                groups && groups.map(group => {
                                                    return Object.values(group.General).filter(cr => cr.name.toLowerCase().includes(searchValue.toLowerCase()))
                                                        .sort((a, b) => (a.name.localeCompare(b.name))).map((gp, i) => {
                                                            return <tr>
                                                               
                                                                <td>{i + 1}</td>
                                                                <td><img src={gp.dp} alt="" className="group-image" /></td>
                                                                <td >{gp.name}</td>
                                                                <td>{gp.user.username}</td>
                                                                <td>
                                                                    <select name={gp.category} className="material-field">
                                                                        {
                                                                            gp.category && gp.category.map(category => {
                                                                                return <option>{category}</option>

                                                                            })
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className="category">
                                                                    {users && users.map(user => {
                                                                        return user.Profile ?
                                                                        (
                                                                            user.Profile.id === gp.user.id ?
                                                                                user.Group_members ?

                                                                                    Object.entries(user.Group_members).map(ab => {
                                                                                        return ab[0] === gp.id ? Object.values(ab[1]).length : null
                                                                                    })

                                                                                    : null
                                                                                : null
                                                                        )

                                                                        : null
                                                                    })}
                                                                </td>
                                                                <td >{new Date(gp.create_date).toUTCString()}</td>
                                                                <td ><p className={gp.email === 'Private' ? "danger" : "success"}>{gp.email}</p></td>
                                                            </tr>
                                                        })
                                                })
                                            )
                                            :
                                            (
                                                groups && groups.map(group => {
                                                    return Object.values(group.General).filter(cr => cr.name.toLowerCase().includes(searchValue.toLowerCase())).reverse().map((gp, i) => {
                                                        return <tr>
                                                            <td>{i + 1}</td>
                                                            <td><img src={gp.dp} alt="" className="group-image" /></td>
                                                            <td>{gp.name}</td>
                                                            <td>{gp.user.username}</td>
                                                            <td>
                                                                <select name={gp.category} className="material-field">
                                                                    {
                                                                        gp.category && gp.category.map(category => {
                                                                            return <option>{category}</option>

                                                                        })
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td className="category">
                                                                {users && users.map(user => {

                                                                    return user.Profile ?
                                                                        (
                                                                            user.Profile.id === gp.user.id ?
                                                                                user.Group_members ?

                                                                                    Object.entries(user.Group_members).map(ab => {
                                                                                        return ab[0] === gp.id ? Object.values(ab[1]).length : null
                                                                                    })

                                                                                    : null
                                                                                : null
                                                                        )

                                                                        : null

                                                                })}
                                                            </td>
                                                            <td>{new Date(gp.create_date).toUTCString()}</td>
                                                            <td><p className={gp.email === 'Private' ? "danger" : "success"}>{gp.email}</p></td>
                                                        </tr>
                                                    })
                                                })
                                            ))

                                }
                            </tbody>
                        </Table>
                    </div>
                </div >
            </div>
        </BaseMarkUp>
    )
}

export default Groups

