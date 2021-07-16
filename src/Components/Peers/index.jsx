import React, {useState} from "react"
import "./peers.css"

import {Table} from "react-bootstrap"

import Pagination from "../Pagination"


const Peers = ({users}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    var mts = users.Peers ? Object.values(users.Peers).length : undefined

    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users.Peers && Object.values(users.Peers)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const userDetails = (id) => {
        return window.location.href = `/user/${id}`

    }

    return (
        <div className="peer">

            {
                users.Peers ? (
                    <>
                        <div>
                            <p>My Peers</p>
                        </div>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>No..</th>
                                    <th></th>
                                    <th>User Name</th>
                                    <th>School</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((peer, i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td><img src={peer.user.image} alt="" className="peer-image" /></td>
                                                <td style={{cursor:'pointer'}} onClick={() => userDetails(peer.user.id)}>{peer.user.username}</td>
                                                <td>{peer.user.institution}</td>
                                                <td>{peer.user.dept}</td>
                                            </tr>
                                        })
                                    }
                            </tbody>
                        </Table>
                    </>
                ) : <p style={{textAlign: 'center'}}>You Have No Peers</p>
            }

                
        </div>
    )
}

export default Peers