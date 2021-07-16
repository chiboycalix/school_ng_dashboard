import React, {useState, useEffect} from 'react'

import * as QueryString from "query-string"
import fire from "../../Firebase/firebase"
import { Col, Container, Row } from 'react-bootstrap'


function Search(props) {
    const [schools, setSchools] = useState()
    const [flag, setFlag] = useState()
    const [selectedGist, setSelectedGist] = useState("Ambrose Alli University")

    useEffect(() => {
        var schoolRef = fire.database().ref().child("Schools")
        schoolRef.on('value', snap => {
            const school = snap.val();
            // const mt = Object.values(school.Posts) ? Object.values(school) : undefined
            console.log(school)
            const schoolList = [];
            for (let m in school) {
                schoolList.push(school[m]);
            }
            console.log("school list",schoolList)
            setSchools(schoolList)
        })


        var FlagRef = fire.database().ref().child("Flagged Gist")
        FlagRef.on('value', snap => {
            const flag = snap.val();
            const allFlag = flag.All
            const flagList = [];
            flagList.push(allFlag)
            setFlag(flagList)
        })



    }, [])

    const parsed = QueryString.parse(props.location.search)

    const sendFlag = []
    flag && flag.map(fs => Object.values(fs).map(fd => sendFlag.push(fd.postid)))

    const result = []
    schools && schools.map(sch => {
        // for (let z in sch) {
        //     if (sch.Posts) {
        //         result.push(sch.Posts[z])
        //     }
            
        // }
        result.push(sch.Posts)
        
    })
    console.log(result)
    
    // const another = result && result.reduce((r,o) => {
    //     Object.keys(o).forEach((k) => {
    //         r.push(o[k])
    //     })
    //     console.log("not sure", r)
    // })
    return (
        <div>
            <p>Hello Search</p>

            <Container fluid>
                <Row>
                    <Col>
                        {
                            schools && schools.map(sch => {
                                return sch.Posts ? (

                                        <div>
                                            {

                                                Object.values(sch.Posts).filter(cr => new Date(cr.date).toDateString() >= new Date(parsed.start).toDateString() && new Date(cr.date).toDateString() <= new Date(parsed.end).toDateString()).map(scc => {
                                                    return <Container fluid>
                                                        <Row>
                                                            <Col>
                                                                <div className="all-gist">

                                                                    <div className="">
                                                                        <div className="allgist-div1">
                                                                            <img src={scc.userDp} alt="" className="gist-image" />
                                                                            <div className="allgist-div1-sub">
                                                                                <p className="allgist-div1-sub-header">{scc.user.institution}</p>
                                                                                <p className="allgist-div1-sub-text">Posted by {scc.user.username}, {new Date(scc.date).toDateString()}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <p>{scc.text}</p>
                                                                        </div>


                                                                        <div className="action">
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" />
                                                                                <p className="list">{scc.comments ? Object.keys(scc.comments).length : 0} comment</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" />
                                                                                <p className="list">{scc.Likes ? Object.keys(scc.Likes).length : 0} like</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" />
                                                                                <p className="list">{scc.comments ? Object.keys(scc.comments).length : 0} Retweet</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>




                                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <img src={scc.userDp} alt="" className="allround-image" />
                                                                        {sendFlag.includes(scc.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" /> : ""}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>



                                                    </Container>
                                                })

                                            }
                                        </div>) : undefined

                            })

                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Search
