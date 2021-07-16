import React, { useState, useEffect } from 'react'
import "./schoolroute.css"

import fire from "../../Firebase/firebase"

import { Table, Modal } from "react-bootstrap"
import Pagination from "../Pagination"
import Spinner from "../Spinner"
import HeaderNav from '../HeaderNav'



function SchoolRoute(props) {
    const [institutions, setInstitutions] = useState();
    const [schools, setSchools] = useState()
    const [roll, setRoll] = useState()
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [searchValue, setSearchValue] = useState('')
    const [sort, setSort] = useState(false)
    const [show, setShow] = useState(false);
    const [faculty, setFaculty] = useState(
        {
            school: [
                {
                    faculty: "",
                    department: [""]
                }
            ]
        }
    )

    var schoolName = props.match.params.schoolname


    const dr = faculty.school.map(fac => {
        return fac.department
    })




    const handleSubmit = () => {

        const matches = schoolName.match(/\b(\w)/g);
        const acrony = matches.join('');

        var schoolRef = fire.database().ref().child("Schools")
        schoolRef.on('value', snap => {
            const school = snap.val();
            console.log("fac", school)
            
            Object.entries(school).map(a => {
                console.log("aaaa",a)
                if (a[0] === props.match.params.schoolname) {
                    Object.entries(a).map(bb => {
                        Object.entries(bb).map(obj => {
                            Object.entries(obj[1]).map(fac => {
                                return fac[0] === "Faculties" ?
                                    (
                                        schoolRef.child(schoolName).child(fac[0]).child(faculty.school[0].faculty).set({
                                            
                                            Departments: true,
                                            id: faculty.school[0].faculty,
                                            school: schoolName,
                                        })
                                    ) : null
                            })
                        })
                    })
                } else {
                    return;
                }
            })

        })


        setFaculty(
            {
                school: [
                    {
                        faculty: "",
                        department: [""]
                    }
                ]
            }
        )


    }

    const handleFacultyChange = (e, i) => {
        let temp = { ...faculty }
        temp.school[i][e.target.name] = e.target.value
        setFaculty(temp)
    }

    const handleDepartmentChange = (e, i, j) => {
        let temp = { ...faculty }
        temp.school[i].department[j] = e.target.value
        setFaculty(temp)
    }





    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage




    const verb = []
    var mts = users && users.map(user => {
        return user.Profile?.institution === props.match.params.schoolname ? (verb.push(user.Profile?.username)) : ""
    })

    const displayItem = verb.length

    const ppt = []
    var bbs = users && users.map(user => {
        return user.Profile?.institution === props.match.params.schoolname ? (ppt.push(user)) : ""
    })

    const currentPost = ppt && ppt

    useEffect(() => {

        const fetchData = async () => {
             setLoading(true)
            var institutionRef = await fire.database().ref().child("Institutions")
            institutionRef.on('value', snap => {
                const institution = snap.val();
                const institutionList = [];
                for (let m in institution) {
                    institutionList.push(institution[m]);
                }
                setInstitutions(institutionList);
                // setLoading(false)
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

            var schoolRef = await fire.database().ref().child("Schools")
            schoolRef.on('value', snap => {
                const school = snap.val();
                const schoolList = [];
                for (let m in school) {
                    schoolList.push(school[m]);
                }
                setSchools(schoolList)
                 setLoading(false)
                setRoll(schoolList.length)
            })

        }
        fetchData()

    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // if (loading) {
    //     return <Spinner />
    // }

    const backClick = (id) => {
        return window.location.href = '/schools/'
    }

    // const userDetails = (id) => {
    //     return window.location.href = `/school/user/${id}`

    // }

    const facultyDetails = (id) => {
        return window.location.href = `/schools/${props.match.params.schoolname}/${id}`

    }


    return (
        <div>
            <HeaderNav />

            <div className="app-div">
                <div className="school-page">
                    <p style={{ cursor: 'pointer', width: '150px'}} onClick={() => backClick()}><span><img src="https://img.icons8.com/ios-glyphs/24/000000/arrow-pointing-left--v2.png" /></span> Back</p>
                    <div style={{ background: 'white', padding: '15px' }}>
                        <div className="search-div">
                            <h4 className="props">Faculties of {props.match.params.schoolname}</h4>
                        </div>

                        <div className="plus" onClick={handleShow}>
                            <img src="https://img.icons8.com/ios-glyphs/50/F07841/plus.png" alt="" className="plus-image" />
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <p className="create">Add Faculty</p>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="label-div">
                                    {
                                        faculty.school && faculty.school.map((schools, i) => (
                                            <div>
                                                <div key={i} className="">
                                                    <span className="labels">Name of Faculty </span><br />
                                                    <div className="fac-input">
                                                        <input type="text" name='faculty' placeholder='Faculty Name' className="form-control cont"
                                                            onChange={e => handleFacultyChange(e, i)} value={faculty.school[i].faculty}
                                                        />
                                                        
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="button-div">
                                    <button className="btnss" type="submit" onClick={() => handleSubmit()} disabled={faculty.school[0].faculty === ""}>Add Faculty</button>
                                </div>
                            </Modal.Body>
                        </Modal>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>No..</th>
                                    <th>Faculty Name</th>
                                    <th className="">Department</th>
                                    {/* <th className="joined">Date Joined</th> */}
                                </tr>
                            </thead>
                            {
                                loading ?  <div style={{display: 'flex', marginTop: "2%", width: '500%', justifyContent: 'center', alignItems: 'center'}}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div> :
                                (
                                    schools && schools.map(school => {
                                        return school.Profile.name === props.match.params.schoolname ?
                                            school.Faculties ?
                                            (
                                                Object.entries(school.Faculties).map((faculty, i) => {
                                                    return <tbody>
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td style={{ cursor: "pointer" }} onClick={() => facultyDetails(faculty[1].id)}>{faculty[1].id}</td>
                                                            <td>{faculty[1].Departments ? Object.values(faculty[1].Departments).length : null}</td>
                                                        </tr>
                                                    </tbody>
                                                })
                                            ) : undefined
                                            : ""
                                    })
                                )
                            }
                        </Table>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default SchoolRoute
