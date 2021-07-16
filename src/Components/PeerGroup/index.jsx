import React, {useState} from "react"
import "./peergroup.css"


import {Table} from "react-bootstrap"

import Pagination from "../Pagination"




const PeerGroup = ({users}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(3)

    var mts = users.Group ? Object.values(users.Group).length : undefined

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users.Group && Object.values(users.Group)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const myGroup = []
    const testing = users.MyGroup ? Object.values(users.MyGroup).map(my => myGroup.push(my.id)) : ""

    return (
        <div className="grops">
            {  users.Group ? (
            <>
                    <div>
                        <p>Groups</p>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th></th>
                                <th>Group Name</th>
                                <th>Role</th>
                                <th>Date Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                currentPosts.map((grp, i) => {
                                        // const valued = myGroup[i]
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td><img src={grp.dp} alt="" className="peergroup-image" /></td>
                                            <td>{grp.name}</td>
                                            {myGroup.includes(grp.id) ?  <td>Admin</td> : <td>Member</td>}
                                            <td>{new Date(grp.create_date).toDateString()}</td>
                                        </tr>
                                    })
                            }
                        </tbody>
                    </Table>
             </>) : <p style={{textAlign: 'center'}}>You Have No Group</p>
}
        </div>
    )
}
export default PeerGroup