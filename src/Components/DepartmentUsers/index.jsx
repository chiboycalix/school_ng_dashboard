import React, { useState, useEffect } from 'react'
import HeaderNav from "../HeaderNav"

import {Table} from "react-bootstrap"
import fire from "../../Firebase/firebase"



function DepartmentUsers(props) {

    const [schools, setSchools] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            var schoolRef = await fire.database().ref().child("Schools")
            schoolRef.on('value', snap => {
                const school = snap.val();
                const schoolList = [];
                for (let m in school) {
                    schoolList.push(school[m]);
                }
                setLoading(false)
                setSchools(schoolList)
            })

        }
        fetchData()

    }, [])

    
    const userDetails = (id) => {
        return window.location.href = `/user/${id}`

    }

    const schoolName = props.match.params.schoolname
    const departmentName = props.match.params.department
    const facultyName = props.match.params.faculty


    const backClick = () => {
        return window.location.href = `/schools/${schoolName}/${facultyName}`
    }


    return (
        <div>
            <HeaderNav />

            <div className="app-div">
                <p style={{ cursor: 'pointer', width: '150px' }} onClick={() => backClick()}><span><img src="https://img.icons8.com/ios-glyphs/24/000000/arrow-pointing-left--v2.png" /></span> Back</p>
                <h4 className="props">Users</h4>

                <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th>Image</th>
                                <th>Users</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {
                            loading ?  <div style={{display: 'flex', marginTop: "2%", width: '300%', justifyContent: 'center', alignItems: 'center'}}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                            (
                                schools && schools.map(school => {
                                    return school.Profile.name === props.match.params.schoolname ?
                                        Object.entries(school.Faculties).map((faculty) => {
                                           return faculty[1].id === props.match.params.faculty ? 
                                            (
                                                faculty[1].Departments ?
                                                (
                                                    Object.values(faculty[1].Departments).map((item, i) => {
                                                        return item.id === props.match.params.department ?
                                                        (
                                                            item.Users ? 
                                                            (
                                                                Object.entries(item.Users).map((student, i) => {
                                                                    return <tbody>
                                                                             <tr>
                                                                                 <td>{i + 1}</td>
                                                                                 <td><img src={student[1].image} alt="" className="user-image" /></td>
                                                                                 <td><p style={{ fontSize: '15px', cursor: "pointer" }} onClick={() => userDetails(student[1].id)}>{student[1].username}</p></td>
                                                                                 <td>{student[1].email}</td>
                                                                             </tr>
                                                                         </tbody>
                                                                })
                                                            )
                                                             : null
                                                        )
                                                         : null
                                                    })
                                                ) 
                                                : null
                                            )
                                           : null
                                                
                                        })
                                        : null
                                })
                            )
                        }
                    </Table>
            </div>

        </div>
    )
}

export default DepartmentUsers
