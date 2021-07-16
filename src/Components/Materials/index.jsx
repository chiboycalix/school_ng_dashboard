import React, { useState, useEffect } from 'react'
import "./materials.css"

import { firestore } from "../../Firebase/firebase"
import Spinner from "../Spinner"
import { OverlayTrigger, Popover, Table } from "react-bootstrap"
import Pagination from "../Pagination"
import CurrencyFormat from 'react-currency-format'
import HeaderNav from '../HeaderNav'
import BaseMarkUp from '../Base/BaseMarkUp'



function Materials() {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [sort, setSort] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(15)
    const [selectedValue, setSelectedValue] = useState('')


    var mts = materials && materials.length



    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            var MaterialRef = await firestore.collection("Materials").doc('Category').collection('General').get()
            var mat = []
            MaterialRef.forEach(doc => {
                mat.push(doc.data())
            });
            setMaterials(mat)
            setLoading(false)
        }
        fetchMaterials()

    }, [])

    // if (loading) {
    //     return <Spinner />
    // }



    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = materials && materials


    const paginate = pageNumber => setCurrentPage(pageNumber);


    const searchResult = materials && materials.filter(cr => cr.document ? cr.document.name.toLowerCase().includes(searchValue.toLowerCase()) : undefined)

    const descendingSort = searchResult && searchResult.reverse()


    const handleChange = (e, material) => {
        setSelectedValue(e.target.value)


        const activeStatus = material.materialID

        firestore.collection("Materials").doc('Category').collection('General').doc(activeStatus).update({
            status: e.target.value
        })

        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const price = materials && materials.reduce((total, pr) => total = total + parseInt(pr.charge, 10), 0)

    return (
        <BaseMarkUp>
            <div className="app-div">
                <div className="users-section">
                    <div className="search-div">
                        <h1 className="amount">Total Amount: 	&#8358;<CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} style={{marginLeft: "-1%"}}/></h1>
                        <div className="trigger">
                            <OverlayTrigger
                                trigger="click"
                                key={"left"}
                                placement={"bottom"}
                                overlay={
                                    <Popover id={`popover-positioned-left`} className="toolspit">
                                        <Popover.Title as="h3" className="inst-header">Sort by</Popover.Title>
                                        <Popover.Content>
                                            <p className="sort" onClick={() => setSort("all")}>All</p>
                                            <p className="sort" onClick={() => setSort("verified")}>Verified</p>
                                            <p className="sort" onClick={() => setSort("unVerified")}>Unverified</p>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <p className="sort"><img src="https://img.icons8.com/ios-glyphs/24/F07841/sorting-answers.png" alt="" /> Sort</p>
                            </OverlayTrigger>
                            <input type="search" placeholder="Search by Material Name" className="search-inp" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th></th>
                                <th className="username">Material</th>
                                <th className="email">Material Type</th>
                                <th className="school">Status</th>
                                <th className="dept">Action Type</th>
                                <th className="status">Documents</th>
                                <th className="username">Charge(Naira)</th>
                                <th className="username">Stars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?  <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                                (sort === "verified" ?
                                    (
                                        searchResult && searchResult.filter((a, b) => (a.status === "VERIFIED")).map((material, i) => {
                                            return <tr key={i}>
                                                <td className="material-status">{i + 1}</td>
                                                <td>{material.coverPhoto ? <img src={material.coverPhoto} alt="" className="cover-photo" /> : ''}</td>
                                                <td className="material-doc">{material.document.name}</td>
                                                <td className="material-status">
                                                    <select name={material.categories} className="material-field">
                                                        {
                                                            material.categories && material.categories.map(category => {
                                                                return <option>{category}</option>

                                                            })
                                                        }
                                                    </select>

                                                </td>

                                                <td className={material.status === "VERIFIED" ? "verified-status" : material.status === "NON_VERIFIED" ? "non-verified-status" : "denied-status"}>{material.status}</td>
                                                <td className="material-status">
                                                    <select name={material.document.name} className="select-field" onChange={(e) => handleChange(e, material)}>
                                                        <option>Move to</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                        <option value="NON_VERIFIED">NON_VERIFIED</option>
                                                        <option value="DENIED">DENIED</option>
                                                    </select>
                                                </td>
                                                <td className="material-status"><a href={material.document.url} target="_blank" className="btn btns2" >View</a></td>
                                                <td className="material-status">{material.charge}</td>
                                                <td className="material-status">{material.stars}</td>
                                            </tr>
                                        })
                                    ) :
                                    sort === "all" ? (
                                        searchResult && searchResult.map((material, i) => {
                                            return <tr key={i}>
                                                <td className="material-status">{i + 1}</td>
                                                <td>{material.coverPhoto ? <img src={material.coverPhoto} alt="" className="cover-photo" /> : ''}</td>
                                                <td className="material-doc">{material.document.name}</td>
                                                <td className="material-status">
                                                    <select name={material.categories} className="material-field">
                                                        {
                                                            material.categories && material.categories.map(category => {
                                                                return <option>{category}</option>

                                                            })
                                                        }
                                                    </select>

                                                </td>

                                                <td className={material.status === "VERIFIED" ? "verified-status" : material.status === "NON_VERIFIED" ? "non-verified-status" : "denied-status"}>{material.status}</td>
                                                <td className="material-status">
                                                    <select name={material.document.name} className="select-field" onChange={(e) => handleChange(e, material)}>
                                                        <option>Move to</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                        <option value="NON_VERIFIED">NON_VERIFIED</option>
                                                        <option value="DENIED">DENIED</option>
                                                    </select>
                                                </td>
                                                <td className="material-status"><a href={material.document.url} target="_blank" className="btn btns2" >View</a></td>
                                                <td className="material-status">{material.charge}</td>
                                                <td className="material-status">{material.stars}</td>
                                            </tr>
                                        })
                                    )
                                        :
                                        (
                                            searchResult && searchResult.filter((a, b) => (a.status === "NON_VERIFIED")).map((material, i) => {
                                                return <tr key={i}>
                                                    <td className="material-status">{i + 1}</td>
                                                    <td >{material.coverPhoto ? <img src={material.coverPhoto} alt="" className="cover-photo" /> : ''}</td>
                                                    <td className="material-doc">{material.document.name}</td>
                                                    <td className="material-status">
                                                        <select name={material.categories} className="material-field">
                                                            {
                                                                material.categories && material.categories.map(category => {
                                                                    return <option>{category}</option>

                                                                })
                                                            }
                                                        </select>

                                                    </td>

                                                    <td className={material.status === "VERIFIED" ? "verified-status" : material.status === "NON_VERIFIED" ? "non-verified-status" : "denied-status"}>{material.status}</td>
                                                    <td className="material-status">
                                                        <select name={material.document.name} className="select-field" onChange={(e) => handleChange(e, material)}>
                                                            <option>Move to</option>
                                                            <option value="VERIFIED">VERIFIED</option>
                                                            <option value="NON_VERIFIED">NON_VERIFIED</option>
                                                            <option value="DENIED">DENIED</option>
                                                        </select>
                                                    </td>
                                                    <td className="material-status"><a href={material.document.url} target="_blank" className="btn btns2" >View</a></td>
                                                    <td className="material-status">{material.charge}</td>
                                                    <td className="material-status">{material.stars}</td>
                                                </tr>
                                            })
                                        ))

                            }
                        </tbody>

                    </Table>
                </div >
            </div>
        </BaseMarkUp>
    )
}

export default Materials
