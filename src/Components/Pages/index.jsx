import React, { useState, useEffect } from 'react'
import "./Pages.css"


import { OverlayTrigger, Popover, Table } from "react-bootstrap"
import Pagination from "../Pagination"
import Spinner from "../Spinner"


import fire from "../../Firebase/firebase"
import HeaderNav from '../HeaderNav'

function Pages() {
    const [pages, setPages] = useState();
    const [users, setUsers] = useState();
    const [selectedPage, setSelectedPage] = useState("Ambrose Alli University");
    const [schools, setSchools] = useState()
    const [sort, setSort] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(15)


    useEffect(() => {
        const fecthSch = async () => {
            var schoolRef = fire.database().ref().child("Schools")
            schoolRef.on('value', snap => {
                const school = snap.val();
                const schoolList = [];
                for (let m in school) {
                    schoolList.push(school[m]);
                }
                setSchools(schoolList)
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


        fecthSch()

    }, [])


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage


    //work in progress
    // users && users.map(user => {
    //     return user.Subscribed_users ? 
    //     (
    //         console.log(user.Subscribed_users)
    //     ) : undefined
    // })


    const paginate = pageNumber => setCurrentPage(pageNumber);

    const mts = []
    schools && schools.map(school => {
        return school.Profile.name.toString() === selectedPage ? (
            school.Business ? (mts.push(school.Business.Category.General).length) : undefined
        ) : undefined
    })

    const pt = mts[0] ? Object.values(mts[0]).length : undefined

    const currentPost = schools && schools.map(sch => sch.Business ? Object.values(sch.Business.Category.General).filter(cr => cr.name.toLowerCase().includes(searchValue.toLowerCase())) : "")


    return (
        <div>
            <HeaderNav />

            <div className="app-div">
                <div className="trend-page">
                    <div className="search-div">
                        <select className="trend-inst" value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
                            {
                                schools && schools.map(sch => {
                                    return <option>
                                        {sch.Profile ? sch.Profile.name : undefined}
                                    </option>
                                })
                            }
                        </select>
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
                            <input type="search" placeholder="Search by Page Name" className="search-inp" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        {
                            schools && schools.map(sch => {
                                return sch.Profile.name.toString() === selectedPage ? (
                                    sch.Business ?
                                        (
                                            <div className="trend-section">
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th className="username">No..</th>
                                                            <th className="username"></th>
                                                            <th className="email">Page Name</th>
                                                            <th className="school">Category</th>
                                                            <th className="email">Phone no</th>
                                                            <th className="school">Owner</th>
                                                            <th className="school">No of Subscribers</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            sort ?
                                                                (
                                                                    Object.values(sch.Business.Category.General).filter(cr => cr.name.toLowerCase().includes(searchValue.toLowerCase())).sort().map((bus, i) => {
                                                                        return <tr>
                                                                            <td className="bus-name">{i + 1}</td>
                                                                            <td><img src={bus.cover_photo} alt="" className="cover-photo" /></td>
                                                                            <td className="bus-name">{bus.name}</td>
                                                                            <td className="bus-name">
                                                                                <select name={bus.category} className="material-field">
                                                                                    {
                                                                                        bus.category && bus.category.map(category => {
                                                                                            return <option>{category}</option>

                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td className="bus-name">{bus.phone}</td>
                                                                            <td className="bus-name">{bus.user.username}</td>
                                                                            <td className="bus-name">
                                                                                {users && users.map(user => {
                                                                                    return user.Profile.id === bus.user.id ?
                                                                                        (user.Subscribed_users ?
                                                                                            (Object.keys(user.Subscribed_users).includes(bus.id)) ?
                                                                                                Object.values(user.Subscribed_users).length
                                                                                                : 0
                                                                                            : 0)
                                                                                        : ""
                                                                                })}
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                )
                                                                :
                                                                (
                                                                    Object.values(sch.Business.Category.General).filter(cr => cr.name.toLowerCase().includes(searchValue.toLowerCase())).reverse().map((bus, i) => {
                                                                        return <tr>
                                                                            <td className="bus-name">{i + 1}</td>
                                                                            <td><img src={bus.cover_photo} alt="" className="cover-photo" /></td>
                                                                            <td className="bus-name">{bus.name}</td>
                                                                            <td className="bus-name">
                                                                                <select name={bus.category} className="material-field">
                                                                                    {
                                                                                        bus.category && bus.category.map(category => {
                                                                                            return <option>{category}</option>

                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td className="bus-name">{bus.phone}</td>
                                                                            <td className="bus-name">{bus.user.username}</td>
                                                                            <td className="bus-name">
                                                                                {users && users.map(user => {
                                                                                    return user.Profile?.id === bus.user.id ?
                                                                                        (user.Subscribed_users ?
                                                                                            (Object.keys(user.Subscribed_users).includes(bus.id)) ?
                                                                                                Object.values(user.Subscribed_users).length
                                                                                                : 0
                                                                                            : 0)
                                                                                        : ""
                                                                                })}
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                )

                                                        }
                                                    </tbody>

                                                </Table>



                                            </div>
                                        )
                                        :
                                        (
                                            <p style={{ textAlign: 'center' }}>No Business for {selectedPage}</p>
                                        )

                                ) : ""

                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pages
