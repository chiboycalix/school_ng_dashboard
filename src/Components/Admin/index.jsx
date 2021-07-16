import React, { useState, useEffect } from 'react'

import "./admin.css"
import HeaderNav from "../HeaderNav"
import { firestore, auth } from "../../Firebase/firebase"

import { Table } from "react-bootstrap"
import BaseMarkUp from '../Base/BaseMarkUp'

function Admin() {
    const [admin, setAdmin] = useState()
    const [loading, setLoading] = useState()
    const [user, setUser] = useState()
    const [currentUser, setCurrentUser] = useState()



    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            auth.onAuthStateChanged(user => {
                var adminRef = firestore.collection("Admin").get()
                    .then((querySnapshot) => {

                        var adminArr = []
                        querySnapshot.forEach((doc) => {
                            adminArr.push(doc.data())
                            setLoading(false)
                        });
                        setAdmin(adminArr)
                        setCurrentUser(user)
                        adminArr?.map(admin => {
                            if (admin.email === user.email) {
                                setUser(admin)

                            }
                        })
                    });

            })
        }
        fetchAdmins()
    }, [])




    return (<BaseMarkUp>
            <div className="app-div">
                <div className="users-section">
                    <div className="search-div">
                        <h1 className="amount">Number of Admins: {admin?.length}</h1>
                        {
                            user?.type === "super" || currentUser?.email === "support@schooln.ng" ?
                                (
                                    <a href="/admin/create" className="btn-admin">Add New Admin</a>
                                )
                                : null
                        }

                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th></th>
                                <th className="username">Admin</th>
                                <th className="email">Email Address</th>
                                <th className="dept">Date Added</th>
                                <th className="status-mat">Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                loading ? <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :

                                    admin && admin.map((ads, i) => {
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td><img src={ads.image} className="admin-image" alt="" /></td>
                                            <td className="bus-name" >{ads.fullName}</td>
                                            <td className="bus-name">{ads.email}</td>
                                            <td className="bus-name">{ads.created_on.toDate().toDateString()}</td>
                                            <td className="bus-name">{ads.type === "super" ? <p className="danger">Super Admin</p> : <p className="success">Admin</p>}</td>
                                        </tr>
                                    })
                            }
                        </tbody>
                    </Table>

                </div>
            </div>
       </BaseMarkUp>
    )
}

export default Admin
