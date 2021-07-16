import React, { useState, useEffect } from 'react'
import "./schools.css"
import { useForm } from "react-hook-form"

import fire from "../../Firebase/firebase"
import { Spinner, Table, OverlayTrigger, Popover, Modal, Button } from "react-bootstrap"
import Pagination from "../Pagination"
import HeaderNav from '../HeaderNav'


import { storage } from "../../Firebase/firebase"
import BaseMarkUp from '../Base/BaseMarkUp'


function Schools() {
    const [schools, setSchools] = useState()
    const [institutions, setInstitutions] = useState();
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [searchValue, setSearchValue] = useState('')
    const [sort, setSort] = useState(false)
    const [show, setShow] = useState(false);
    const [roll, setRoll] = useState()
    const [schoolName, setSchoolName] = useState('')
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
    const [institutionType, setInstitutionType] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [urls, setUrls] = useState("");
    const [progress, setProgress] = useState(0)



    const handleClose = () => {
        setShow(false);
        setSchoolName("")
        setInstitutionType('')
        setUrls("")
        setProgress(0)

    }
    const handleShow = () => setShow(true);




    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = schools && schools

    const paginate = pageNumber => setCurrentPage(pageNumber);



    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            var schoolRef = await fire.database().ref().child("Schools")
            schoolRef.on('value', snap => {
                const school = snap.val();
                const schoolList = [];
                for (let m in school) {
                    schoolList.push(school[m]);
                }
                setSchools(schoolList)
                // setLoading(false)
                setRoll(schoolList.length)
            })

            var institutionRef = await fire.database().ref().child("Institutions")
            institutionRef.on('value', snap => {
                const institution = snap.val();
                const institutionList = [];
                for (let m in institution) {
                    institutionList.push(institution[m]);
                }
                setInstitutions(institutionList);
            })
        }

        fetchData()
    }, [])






    const handleRoute = (id) => {
        return window.location.href = `/schools/${id}`
    }

    const searchResult = schools && schools.filter(cr => cr.Profile ? cr.Profile.name.toLowerCase().includes(searchValue.toLowerCase()) : undefined)

    var mts = schools && schools.length


    const dr = faculty.school.map(fac => {
        return (
            {
                Departments: fac.department.map(dp => {
                    return {
                        id: dp,
                        schools: {
                            id: fac.faculty,
                            school: schoolName
                        }
                    }
                }),
                id: fac.faculty,
                school: schoolName,


            }
        )
    })

    const handleUpload = (event) => {
        if (event.target.files[0]) {
            setImageUrl(event.target.files[0])
        }
        const imageUrls = event.target.files[0]
        const imgName = event.target.files[0].name

        const uploadFile = storage.ref(`school logos/${imgName}`).put(imageUrls)

        uploadFile.on(
            "state_changed",
            snapshot => {
                const progres = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progres)
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("school logos")
                    .child(imgName)
                    .getDownloadURL()
                    .then(url => {
                        console.log({ url })
                        setUrls(url)
                    })
            }
        )

    }

    const handleSubmits = () => {
        const matches = schoolName.match(/\b(\w)/g);
        const acrony = matches.join('');

        var schoolRef = fire.database().ref().child("Schools")
        schoolRef.child(schoolName).set({
            Faculties: true,
            Profile: {
                name: schoolName,
            },
        })

        var schoolRef = fire.database().ref().child("Institutions")
        schoolRef.child(schoolName).set({
            name: schoolName,
            type: institutionType,
            image: urls,
        })

        var schoolRef = fire.database().ref().child("Institution Types")
        schoolRef.on('value', snap => {
            const school = snap.val();
            Object.entries(school).map(a => {
                if (a[0] === institutionType) {
                    schoolRef.child(a[0]).child(acrony).set({
                        id: acrony,
                        name: schoolName
                    })
                } else {
                    return;
                }
            })

        })



        setSchoolName("")
        setInstitutionType('')
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

        setUrls("")
        setProgress(0)
        handleClose()

    }


    const onSearch = (e) => {
        if (searchValue.length > 0) {
            setSearchValue(e)
            setRoll(1)
        } else {
            setSearchValue(e)
            setRoll(roll)
        }

    }

    // console.log("img", imageUrl)

    return (
        <BaseMarkUp>
            <div className="app-div">
                <div className='school-page'>
                    <div className="search-div">
                        <h3>All Schools</h3>
                        <div className="trigger">
                            <OverlayTrigger
                                trigger="click"
                                key={"left"}
                                placement={"bottom"}
                                overlay={
                                    <Popover id={`popover-positioned-left`} className="toolspit">
                                        <Popover.Title as="h3" className="inst-header">Sort by</Popover.Title>
                                        <Popover.Content>
                                            <p className="sort" onClick={() => setSort(true)}>Ascending</p>
                                            <p className="sort" onClick={() => setSort(false)}>Descending</p>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <p className="sort"><img src="https://img.icons8.com/ios-glyphs/24/F07841/sorting-answers.png" alt="" /> Sort</p>
                            </OverlayTrigger>
                            <input type="search" placeholder="Search by School name" className="search-inp" value={searchValue} onChange={(e) => onSearch(e.target.value)} />
                        </div>

                    </div>

                    <div className="plus" onClick={handleShow}>
                        <img src="https://img.icons8.com/ios-glyphs/50/F07841/plus.png" alt="" className="plus-image" />
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <p className="create">Create New School</p>
                        </Modal.Header>
                        <Modal.Body>

                            <div>
                                <label className="labels">Name of School</label><br />
                                <input
                                    type="text"
                                    className="form-control"
                                    value={schoolName}
                                    onChange={(e => setSchoolName(e.target.value))} />

                                <select name="institution" className="select-inst" onChange={(e) => setInstitutionType(e.target.value)}>
                                    <option>Type of Institution</option>
                                    <option value="Federal Polytechnics">Federal Polytechnics</option>
                                    <option value="State Polytechnics">State Polytechnics</option>
                                    <option value="Federal Universities">Federal Universities</option>
                                    <option value="State Universities">State Universities</option>
                                    <option value="Private Universities">Private Universities</option>
                                    <option value="College of Education">College of Education</option>
                                </select>


                                <div style={{ padding: "10px", width: "100%" }}>
                                    <input
                                        type="file"
                                        class=" w-100 upload-but"
                                        onChange={handleUpload}
                                    />
                                </div>

                                <label for="file" className="logo-upload">Logo Uploading progress:</label>
                                <progress value={progress} max="100" className="progressbar" />
                            </div>

                            <div className="button-div">
                                <button className="btnss" type="submit" onClick={() => handleSubmits()} disabled={schoolName === "" || institutionType === "" || urls === ""}>Add School</button>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th className="username">Schools</th>
                                <th className="email">Faculty</th>
                                <th className="school">Gists</th>
                                <th className="dept">Campaign</th>
                                <th className="status">Users</th>
                            </tr>
                        </thead>
                        {
                            sort ?
                                (
                                    searchResult && searchResult.sort((a, b) => (a.Profile.name.localeCompare(b.Profile.name))).map((school, index) => {
                                        return <tbody>
                                            <tr >
                                                <td>{index + 1}</td>
                                                <td style={{ cursor: 'pointer' }} onClick={() => handleRoute(school.Profile.name)}>{school.Profile ? school.Profile.name : undefined}</td>
                                                <td className="bus-name">{school.Faculties ? Object.keys(school.Faculties).length : undefined}</td>
                                                {school.Posts ?
                                                    <td className="bus-name">{Object.keys(school.Posts).length}</td> : <td className="bus-name">0</td>
                                                }
                                                <td className="bus-name">{school.CAMPAIGN ? Object.keys(school.CAMPAIGN).length : undefined}</td>
                                                <td className="bus-name">{school.Users ? Object.keys(school.Users).length : undefined}</td>
                                            </tr>
                                        </tbody>
                                    })
                                )
                                :
                                (
                                    searchResult && searchResult.reverse().map((school, index) => {
                                        return <tbody>
                                            <tr >
                                                <td>{index + 1}</td>
                                                <td style={{ cursor: 'pointer' }} onClick={() => handleRoute(school.Profile.name)}>{school.Profile.name}</td>
                                                <td className="bus-name">{school.Faculties ? Object.keys(school.Faculties).length : undefined}</td>
                                                {school.Posts ?
                                                    <td className="bus-name">{Object.keys(school.Posts).length}</td> : <td className="bus-name">0</td>
                                                }
                                                <td className="bus-name">{school.CAMPAIGN ? Object.keys(school.CAMPAIGN).length : undefined}</td>
                                                <td className="bus-name">{school.Users ? Object.keys(school.Users).length : undefined}</td>
                                            </tr>
                                        </tbody>
                                    })
                                )
                        }
                    </Table>

                </div>
            </div>
       </BaseMarkUp>
    )
}

export default Schools
