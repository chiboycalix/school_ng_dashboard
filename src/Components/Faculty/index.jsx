import React, { useState, useEffect } from 'react'
import HeaderNav from '../HeaderNav'
import { Table, Modal } from "react-bootstrap"

import fire from "../../Firebase/firebase"

function Faculty(props) {
    const [schools, setSchools] = useState()
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState("")
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    var schoolName = props.match.params.schoolname

    const handleSubmit = () => {
        var schoolRef = fire.database().ref().child("Schools")
        schoolRef.once('value', snap => {
            const school = snap.val();
            Object.entries(school).map(a => {
                if (a[0] === props.match.params.schoolname) {
                    Object.entries(a).map(bb => {
                        Object.entries(bb).map(obj => {
                            Object.entries(obj[1]).map(fac => {
                                return fac[0] === "Faculties" ?
                                    (
                                        Object.entries(fac[1]).map(ab => {

                                            return ab[1].id === props.match.params.faculty ?
                                                (
                                                    schoolRef.child(schoolName).child(fac[0]).child(props.match.params.faculty).child("Departments").child(inputValue).set({
                                                        id: inputValue,
                                                        schools: {
                                                            id: props.match.params.faculty,
                                                            school: schoolName
                                                        }
                                                    })
                                                ) : null

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


        setInputValue("")


    }

    const deptUsers = (user) => {
        return window.location.href = `/schools/${schoolName}/${props.match.params.faculty}/${user}`
    }

    const backClick = () => {
        return window.location.href = `/schools/${schoolName}`
    }

    return (
        <div>
            <HeaderNav />
            <div className="app-div">
                <div className="school-page">
                <p style={{ cursor: 'pointer', width: '150px'}} onClick={() => backClick()}><span><img src="https://img.icons8.com/ios-glyphs/24/000000/arrow-pointing-left--v2.png" /></span> Back</p>
                    <h4 className="props">Departments in {props.match.params.faculty}</h4>
                    <div className="plus" onClick={handleShow}>
                        <img src="https://img.icons8.com/ios-glyphs/50/F07841/plus.png" alt="" className="plus-image" />
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <p className="create">Add Department</p>
                        </Modal.Header>
                        <Modal.Body>


                            <div className="label-div">
                                {
                                    <div>
                                        <div className="">
                                            <div >
                                                <span className="dep-labels">Add Department </span><br />
                                                <div className="dep-input">
                                                    <input type="text" name='department' placeholder='Department' className="form-control dep"
                                                        onChange={e => setInputValue(e.target.value)}
                                                        value={inputValue}
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="button-div">
                                <button className="btnss" type="submit" onClick={() => handleSubmit()} disabled={inputValue === ""}>Add Department</button>
                            </div>
                        </Modal.Body>
                    </Modal>


                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No..</th>
                                <th>Departments Name</th>
                                <th>Users</th>
                            </tr>
                        </thead>
                        {
                            loading ?  <div style={{display: 'flex', marginTop: "2%", width: '500%', justifyContent: 'center', alignItems: 'center'}}><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" /></div>:
                            (
                                schools && schools.map(school => {
                                    return school.Profile.name === props.match.params.schoolname ?
                                        Object.entries(school.Faculties).map((faculty) => {
                                            return faculty[1].id === props.match.params.faculty ?
                                                faculty[1].Departments ? Object.values(faculty[1].Departments).map((item, i) => {
                                                    return <tbody>
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td style={{cursor: "pointer"}} onClick={() => deptUsers(item.id)}>{item.id}</td>
                                                            <td >{item.Users ? Object.entries(item.Users).length : 0}</td>
                                                        </tr>
                                                    </tbody>

                                                }) : null

                                                : null
                                        })
                                        : null
                                })
                            )
                        }
                    </Table>
                </div>


            </div>

        </div>
    )
}

export default Faculty
