import React, {useState} from 'react'
import "./notification.css"

import Pagination from "../Pagination"

function Notification({users}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)


    var mts = users.Notifications ? Object.values(users.Notifications).length : undefined

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users.Notifications && Object.values(users.Notifications).slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div className="notifcation">
            
            
            {
                users.Notifications ? (
                    currentPosts.map(notify => {
                        return <div className="notification-div">
                                <h4 className="notification-header">{notify.message}</h4>
                                <p className="notification-text">{new Date(notify.time).toDateString()}</p>
                            </div>
                    })
                ) : <p style={{textAlign: 'center'}}>You Have No Notifications</p>
            }

                <Pagination     
                    postPerPage={postPerPage} 
                    totalPost={mts} 
                    paginate={paginate}
                    currentPage={currentPage}
                />
        </div>
    )
}

export default Notification
