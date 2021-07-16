import React, {useState} from 'react'
import "./business.css"

import {Table} from "react-bootstrap"
import Pagination from "../Pagination"

function Business({users}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(3)


    var mts = users.Business ? Object.values(users.Business).length : undefined

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users.Business && Object.values(users.Business)

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div className="business">
           { users.Business ? (
               <>
                        <p>My Business</p>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>No..</th>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Phone No</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    currentPosts.map((bus, i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td><img src={bus.dp} alt="" className="peergroup-image" /></td>
                                                <td>{bus.name}</td>
                                                <td>{bus.category}</td>
                                                <td>{bus.phone}</td>
                                                <td>{new Date(bus.create_date).toDateString()}</td>
                                            </tr>
                                         })
                                   
                                }
                            </tbody>
                        </Table>
                    </>
             ) : <p style={{textAlign: 'center'}}>You Have No Business</p>}
        </div>
    )
}

export default Business
