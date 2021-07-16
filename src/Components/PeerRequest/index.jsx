import React, {useState} from 'react'

import {Table} from "react-bootstrap"

import Pagination from "../Pagination"

function PeerRequest({users}) {

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    var mts = users.Peerrequest ? Object.values(users.Peerrequest).length : undefined

    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users["Peer request"] && Object.values(users["Peer request"])

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div className="peer">

        {
            users.Peers ? (
                <>
                    <div>
                        <p>Peer Request</p>
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
                            {currentPosts && currentPosts.map((peer, i) => {
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td><img src={peer.user.image} alt="" className="peer-image" /></td>
                                            <td>{peer.user.username}</td>
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

export default PeerRequest
