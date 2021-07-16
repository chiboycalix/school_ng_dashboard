import React, { useState, useEffect } from "react"
import './trends.css'


import fire from "../../Firebase/firebase"
import Pagination from "../Pagination"

import { Container, Row, Col, Table, OverlayTrigger, Popover } from "react-bootstrap"
import HeaderNav from "../HeaderNav"
import BaseMarkUp from "../Base/BaseMarkUp"

const Trends = () => {
    const [trends, setTrends] = useState()
    const [selectedTrend, setSelectedTrend] = useState("Ambrose Alli University");
    const [schools, setSchools] = useState()
    const [sort, setSort] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(15)



    useEffect(() => {

        var schoolRef = fire.database().ref().child("Schools")
        schoolRef.on('value', snap => {
            const school = snap.val();
            const schoolList = [];
            for (let m in school) {
                schoolList.push(school[m]);
            }
            setSchools(schoolList)
        })


        var issueRef = fire.database().ref().child("School Trends")
        issueRef.on('value', snap => {
            const issue = snap.val();
            const issueList = [];
            for (let m in issue) {
                issueList.push({
                    name: Object.keys(issue),
                    trend: issue[m]
                });
            }
            setTrends(issueList)
        })

    }, [])


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = trends && trends



    const paginate = pageNumber => setCurrentPage(pageNumber);



    const mts = []
    trends && trends.map(trend => {
        return trend.name.toString() === selectedTrend ? (
            trend.trend ? (mts.push(Object.entries(trend.trend).length)) : undefined
        ) : undefined
    })


    return (
    <BaseMarkUp>
        <div className="app-div">
            <div className="trend-page">
                <div className="search-div">
                    <select className="trend-inst" value={selectedTrend} onChange={(e) => setSelectedTrend(e.target.value)}>
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
                                        <p className="sort" onClick={() => setSort(false)}>Highest Users</p>
                                        <p className="sort" onClick={() => setSort(true)}>Lowest Users</p>
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <p className="sort"><img src="https://img.icons8.com/ios-glyphs/24/F07841/sorting-answers.png" alt="" /> Sort</p>
                        </OverlayTrigger>
                        <input type="search" placeholder="Search by Trendname" className="search-inp" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                </div>

                <div>
                    {
                        trends && trends.map(trend => {
                            return trend.name.toString() === selectedTrend ? (
                                <div className="trend-section">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th className="username">No..</th>
                                                <th className="email">Trend</th>
                                                <th className="school">Gist</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sort ?
                                                    (
                                                        trend.trend ? Object.entries(trend.trend).filter(cr => cr[0].toLowerCase().includes(searchValue.toLowerCase())).sort((a, b) => Object.values(a[1]).length - Object.values(b[1]).length).map((tr, i) => {
                                                            return <tr>
                                                                <td className="bus-name">{i + 1}</td>
                                                                <td className="bus-name">{tr[0]}</td>
                                                                <td className="bus-name">{Object.values(tr[1]).length}</td>
                                                            </tr>
                                                        }) : undefined
                                                    )
                                                    :
                                                    (
                                                        trend.trend ? Object.entries(trend.trend).filter(cr => cr[0].toLowerCase().includes(searchValue.toLowerCase())).sort((a, b) => Object.values(b[1]).length - Object.values(a[1]).length).map((tr, i) => {
                                                            return <tr>
                                                                <td className="bus-name">{i + 1}</td>
                                                                <td className="bus-name">{tr[0]}</td>
                                                                <td className="bus-name">{Object.values(tr[1]).length}</td>
                                                            </tr>
                                                        }) : undefined
                                                    )
                                            }
                                        </tbody>
                                    </Table>


                                </div>
                            ) : <p style={{ textAlign: 'center' }}>No Trend for {selectedTrend}</p>

                        })
                    }
                </div>

            </div>
        </div>
    </BaseMarkUp>
    )
}

export default Trends