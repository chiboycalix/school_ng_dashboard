import React, { useState, useEffect } from "react"
import "./gists.css"

import fire, { firestore } from "../../Firebase/firebase"
import { Container, Row, Col } from "react-bootstrap"

import Pagination from "../Pagination"
import Spinner from "../Spinner"
import Search from "../Search"
import GistModal from "../GistModal"
import CurrencyFormat from 'react-currency-format'
import ShowMoreText from 'react-show-more-text';
import HeaderNav from "../HeaderNav"
import LazyLoad from "react-lazyload"
import BaseMarkUp from "../Base/BaseMarkUp"


const Gists = () => {
  const [gistLength, setGistLength] = useState();
  const [selectedGist, setSelectedGist] = useState("Ambrose Alli University");
  const [schools, setSchools] = useState()
  const [flag, setFlag] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(4)
  const [searchValue, setSearchValue] = useState('')
  const [radio, setRadio] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [search, setSearch] = useState(false)
  const [dateSearch, setDateSearch] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [gistId, setGistId] = useState('')
  const [schGist, setSchGist] = useState()
  const [users, setUsers] = useState()


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const verb = []
  schools && schools.map(sch => {
    return sch.Profile ? (sch.Profile.name === selectedGist ? (sch.Posts ? verb.push(Object.values(sch.Posts)) : undefined) : '') : undefined
  })

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  }

  const ppt = []
  schools && schools.map(sch => {
    return sch.Profile ? (sch.Profile.name === selectedGist ? (sch.Posts ? ppt.push(Object.keys(sch.Posts).length) : undefined) : "") : undefined
  })
  const tpost = schGist && schGist.length



  useEffect(() => {
    var schoolGistRef = firestore.collection("School Gist").doc(selectedGist).collection("Gist").get()
    schoolGistRef.then(function (querySnapshot) {
      const gistPush = []
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var snap = doc.data()

        gistPush.push(snap);

      });
      setSchGist(gistPush)
      setGistLength(gistPush.length)
    });
  }, [selectedGist])



  useEffect(() => {
    var schoolRef = fire.database().ref().child("Schools")
    schoolRef.on('value', snap => {
      const school = snap.val();
      const schoolList = [];
      for (let m in school) {
        schoolList.push(school[m]);
      }
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

    var userRef = fire.database().ref().child("Users")
    userRef.on('value', snap => {
      const user = snap.val();
      const userList = [];

      for (let m in user) {
        userList.push(user[m]);
      }
      setUsers(userList);
    })



  }, [])


  const sendFlag = []
  flag && flag.map(fs => Object.values(fs).map(fd => sendFlag.push(fd.postid)))

  const start = Date.parse(startDate)
  const end = Date.parse(endDate)

  const searchSubmit = () => {
    // return window.location.href=`/search?start=${startDate}&end=${endDate}`
    setDateSearch(true)
  }



  const handleGist = (id) => {
    setModalShow(true)
    setGistId(id)
  }

  const _onFocus = (e) => {
    e.currentTarget.type = "date";
  }

  const _onBlur = (e) => {
    e.currentTarget.type = "text";
  }

  const resetSubmit = () => {
    setDateSearch(false)
    setStartDate('')
    setEndDate('')
  }

  const postComment = (gistId) => {
    return users && users.map(user => {
      return user["Post Comments"] ?
        (
          Object.entries(user["Post Comments"]).map(post => {
            return post[0] === gistId ?
              (
                Object.values(post[1]).length
              ) : null
          })
        ) : undefined
    })

  }

  const postLikes = (gistId) => {
    return users && users.map(user => {
      return user.PostLikes ?
        (
          Object.entries(user.PostLikes).map(post => {
            return post[0] === gistId ?
              (
                Object.values(post[1]).length
              ) : null
          })
        ) : undefined
    })

  }

  const repost = (gistId) => {
    return users && users.map(user => {
      return user.Repost ?
        (
          Object.entries(user.Repost).map(post => {
            return post[0] === gistId ?
              (
                Object.values(post[1]).length
              ) : null
          })
        ) : undefined
    })

  }


  const gistArr = schGist && schGist.filter(cr => cr.user.username.toLowerCase().includes(searchValue.toLowerCase()))

  const gistDateFilter = schGist && schGist.filter(cr => cr.date >= start && cr.date <= end)

  return (

    <BaseMarkUp>
      <div className="app-div">
        <div className="gist-page">
          <Container>
            <Row>
              <Col lg="12">
                <input type="search" placeholder=" Search by username" className="gist-input" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              </Col>
            </Row>
          </Container>
          <div className="gist-cont-div">
            <select className="gist-inst" value={selectedGist} onChange={(e) => setSelectedGist(e.target.value)}>
              {
                schools && schools.map(sch => {
                  return <option>
                    {sch.Profile ? sch.Profile.name : undefined}
                  </option>
                })
              }
            </select>

            <p className="total-gist">Total Gists: <CurrencyFormat value={gistLength} displayType={'text'} thousandSeparator={true} /></p>
          </div>


          <Container fluid>
            <Row className="rowes">
              <Col lg="8" md="8" xs="12" sm="8">

                {
                  !dateSearch ?
                    (<div style={{ marginLeft: '-3%' }}>
                      {
                        radio === 'All' ?
                          (
                            schGist ?
                              (
                                <div>
                                  {gistArr.sort((a, b) => b.date - a.date).map(gists => {
                                    return <LazyLoad>
                                      <Container fluid>
                                        <Row>
                                          <Col xs="12" className="all-gist" >

                                            <div className="gimst">
                                              <div className="allgist-div1" onClick={() => handleGist(gists.postid)}>
                                                <img src={gists.userDp} alt="" className="gist-image" />
                                                <div className="allgist-div1-sub">
                                                  <p className="allgist-div1-sub-header">{gists.user.username}</p>
                                                  <p className="allgist-div1-sub-text">{new Date(gists.date).toDateString()}</p>
                                                </div>
                                              </div>
                                              <div className="gimst-div">
                                                <ShowMoreText
                                                  lines={1}
                                                  more='Show more'
                                                  less='Show less'
                                                  className='content'
                                                  anchorClass='my-anchor-css-class pt'
                                                  onClick={executeOnClick}
                                                  expanded={false}
                                                  width={700}
                                                >
                                                  <p className="textss">{gists.text}</p>
                                                </ShowMoreText>


                                              </div>

                                              <div>
                                                {
                                                  gists.sharedpost ?
                                                    (
                                                      <div className="shared">
                                                        <span style={{ fontSize: "10px", color: "grey" }}> <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" /> Reposted</span>
                                                        <p>{gists.sharedpost.text}</p>
                                                        <img src={gists.sharedpost.imgarray ? gists.sharedpost.imgarray[0].imgurl : undefined} alt="" className="allround-image" />
                                                      </div>
                                                    ) : undefined
                                                }
                                              </div>

                                              <div className="action">
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                                                  <p className="list">{postComment(gists.postid)} comment</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                                                  <p className="list">{postLikes(gists.postid)} like</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                                                  <p className="list">{repost(gists.postid)} Regist</p>
                                                </div>
                                              </div>
                                            </div>




                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                              {
                                                gists.videourl ?
                                                  <video className="vmd" controls>
                                                    <source src={gists.videourl} type="video/mp4" />
                                                  </video>
                                                  : gists.imgarray ? <img src={gists.imgarray[0].imgurl} alt="" className="allround-image" /> : ""
                                              }

                                              {sendFlag.includes(gists.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""}
                                            </div>


                                          </Col>
                                        </Row>
                                        <GistModal
                                          show={modalShow}
                                          onHide={() => setModalShow(false)}
                                          id={gistId}
                                          schools={schools}
                                          schGists={schGist}
                                          flag={sendFlag}
                                          users={users}
                                          selectedGist={selectedGist}
                                        />

                                      </Container>
                                    </LazyLoad>
                                  })}
                                </div>
                              )
                              : undefined

                          )
                          :
                          (
                            gistArr.sort((a, b) => b.date - a.date).map(gists => {
                              return sendFlag.includes(gists.postid) ?
                                <LazyLoad>
                                  <Container fluid>
                                    <Row>
                                      <Col xs="12" className="all-gist" >

                                        <div className="gimst">
                                          <div className="allgist-div1" onClick={() => handleGist(gists.postid)}>
                                            <img src={gists.userDp} alt="" className="gist-image" />
                                            <div className="allgist-div1-sub">
                                              <p className="allgist-div1-sub-header">{gists.user.username}</p>
                                              <p className="allgist-div1-sub-text">{new Date(gists.date).toDateString()}</p>
                                            </div>
                                          </div>
                                          <div className="gimst-div">
                                            <ShowMoreText
                                              lines={1}
                                              more='Show more'
                                              less='Show less'
                                              className='content'
                                              anchorClass='my-anchor-css-class pt'
                                              onClick={executeOnClick}
                                              expanded={false}
                                              width={700}
                                            >
                                              <p className="textss">{gists.text}</p>
                                            </ShowMoreText>


                                          </div>

                                          <div>
                                            {
                                              gists.sharedpost ?
                                                (
                                                  <div className="shared">
                                                    <span style={{ fontSize: "10px", color: "grey" }}> <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" /> Reposted</span>
                                                    <p>{gists.sharedpost.text}</p>
                                                    <img src={gists.sharedpost.imgarray[0].imgurl} alt="" className="allround-image" />
                                                  </div>
                                                ) : undefined
                                            }
                                          </div>

                                          <div className="action">
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                              <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                                              <p className="list">{postComment(gists.postid)} comment</p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                              <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                                              <p className="list">{postLikes(gists.postid)} like</p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                              <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                                              <p className="list">{repost(gists.postid)} Regist</p>
                                            </div>
                                          </div>
                                        </div>




                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                          {
                                            gists.videourl ?
                                              <video className="vmd" controls>
                                                <source src={gists.videourl} type="video/mp4" />
                                              </video>
                                              : gists.imgarray ? <img src={gists.imgarray[0].imgurl} alt="" className="allround-image" /> : ""
                                          }

                                          {sendFlag.includes(gists.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""}
                                        </div>


                                      </Col>
                                    </Row>
                                    <GistModal
                                      show={modalShow}
                                      onHide={() => setModalShow(false)}
                                      id={gistId}
                                      schools={schools}
                                      schGists={schGist}
                                      users={users}
                                      flag={sendFlag}
                                      selectedGist={selectedGist}
                                    />

                                  </Container>
                                </LazyLoad>
                                : ""
                            })
                          )
                      }


                    </div>)

                    :

                    (
                      <div style={{ marginLeft: '-3%' }}>
                        {
                          radio === 'All' ?
                            (
                              schGist ?
                                (
                                  <div>
                                    {gistDateFilter.sort((a, b) => b.date - a.date).map(gists => {
                                      return <LazyLoad><Container fluid>
                                        <Row>
                                          <Col xs="12" className="all-gist" >

                                            <div className="gimst">
                                              <div className="allgist-div1" onClick={() => handleGist(gists.postid)}>
                                                <img src={gists.userDp} alt="" className="gist-image" />
                                                <div className="allgist-div1-sub">
                                                  <p className="allgist-div1-sub-header">{gists.user.username}</p>
                                                  <p className="allgist-div1-sub-text">{new Date(gists.date).toDateString()}</p>
                                                </div>
                                              </div>
                                              <div className="gimst-div">
                                                <ShowMoreText
                                                  lines={1}
                                                  more='Show more'
                                                  less='Show less'
                                                  className='content'
                                                  anchorClass='my-anchor-css-class pt'
                                                  onClick={executeOnClick}
                                                  expanded={false}
                                                  width={700}
                                                >
                                                  <p className="textss">{gists.text}</p>
                                                </ShowMoreText>


                                              </div>

                                              <div>
                                                {
                                                  gists.sharedpost ?
                                                    (
                                                      <div className="shared">
                                                        <span style={{ fontSize: "10px", color: "grey" }}> <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" /> Reposted</span>
                                                        <p>{gists.sharedpost.text}</p>
                                                        <img src={gists.sharedpost.imgarray[0].imgurl} alt="" className="allround-image" />
                                                      </div>
                                                    ) : undefined
                                                }
                                              </div>

                                              <div className="action">
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                                                  <p className="list">{postComment(gists.postid)} comment</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                                                  <p className="list">{postLikes(gists.postid)} like</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                  <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                                                  <p className="list">{repost(gists.postid)} Regist</p>
                                                </div>
                                              </div>
                                            </div>




                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                              {
                                                gists.videourl ?
                                                  <video className="vmd" controls>
                                                    <source src={gists.videourl} type="video/mp4" />
                                                  </video>
                                                  : gists.imgarray ? <img src={gists.imgarray[0].imgurl} alt="" className="allround-image" /> : ""
                                              }

                                              {sendFlag.includes(gists.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""}
                                            </div>


                                          </Col>
                                        </Row>
                                        <GistModal
                                          show={modalShow}
                                          onHide={() => setModalShow(false)}
                                          id={gistId}
                                          schools={schools}
                                          schGists={schGist}
                                          flag={sendFlag}
                                          users={users}
                                          selectedGist={selectedGist}
                                        />

                                      </Container>
                                      </LazyLoad>
                                    })}
                                  </div>
                                )
                                : undefined

                            ) :
                            (

                              gistDateFilter.sort((a, b) => b.date - a.date).map(gists => {
                                return sendFlag.includes(gists.postid) ?
                                  <LazyLoad>
                                    <Container fluid>
                                      <Row>
                                        <Col xs="12" className="all-gist" >

                                          <div className="gimst">
                                            <div className="allgist-div1" onClick={() => handleGist(gists.postid)}>
                                              <img src={gists.userDp} alt="" className="gist-image" />
                                              <div className="allgist-div1-sub">
                                                <p className="allgist-div1-sub-header">{gists.user.username}</p>
                                                <p className="allgist-div1-sub-text">{new Date(gists.date).toDateString()}</p>
                                              </div>
                                            </div>
                                            <div className="gimst-div">
                                              <ShowMoreText
                                                lines={1}
                                                more='Show more'
                                                less='Show less'
                                                className='content'
                                                anchorClass='my-anchor-css-class pt'
                                                onClick={executeOnClick}
                                                expanded={false}
                                                width={700}
                                              >
                                                <p className="textss">{gists.text}</p>
                                              </ShowMoreText>


                                            </div>

                                            <div>
                                              {
                                                gists.sharedpost ?
                                                  (
                                                    <div className="shared">
                                                      <span style={{ fontSize: "10px", color: "grey" }}> <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" /> Reposted</span>
                                                      <p>{gists.sharedpost.text}</p>
                                                      <img src={gists.sharedpost.imgarray[0].imgurl} alt="" className="allround-image" />
                                                    </div>
                                                  ) : undefined
                                              }
                                            </div>

                                            <div className="action">
                                              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                                                <p className="list">{postComment(gists.postid)} comment</p>
                                              </div>
                                              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                                                <p className="list">{postLikes(gists.postid)} like</p>
                                              </div>
                                              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                                                <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                                                <p className="list">{repost(gists.postid)} Regist</p>
                                              </div>
                                            </div>
                                          </div>




                                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            {
                                              gists.videourl ?
                                                <video className="vmd" controls>
                                                  <source src={gists.videourl} type="video/mp4" />
                                                </video>
                                                : gists.imgarray ? <img src={gists.imgarray[0].imgurl} alt="" className="allround-image" /> : ""
                                            }

                                            {sendFlag.includes(gists.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""}
                                          </div>


                                        </Col>
                                      </Row>
                                      <GistModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        id={gistId}
                                        schools={schools}
                                        schGists={schGist}
                                        users={users}
                                        flag={sendFlag}
                                        selectedGist={selectedGist}
                                      />

                                    </Container>
                                  </LazyLoad>
                                  : ""
                              })

                            )
                        }
                      </div>

                    )
                }

              </Col>

              <Col lg="4" md="4" xs="12" sm="4" className="filtered">
                <div className="filter-div">
                  <p className="filter-text"><img src="https://img.icons8.com/ios-glyphs/20/F07841/filter.png" alt="" /> Filter</p>
                </div>


                <div>
                  <label>By Status</label><br />
                  <input
                    type="radio"
                    value="All"
                    checked={radio === 'All'}
                    onChange={(e) => setRadio(e.target.value)} /><span className="all">All</span><br />
                  <input
                    type="radio"
                    value="Flagged"
                    checked={radio === 'Flagged'}
                    onChange={(e) => setRadio(e.target.value)} /><span className="all">Flagged</span><br />
                </div>

                <div className="date-div">
                  <label>By Date</label><br />
                  <input
                    type="text"
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    id="date"
                    placeholder="Start Date"
                    value={startDate}
                    // checked={radio === 'All'}
                    className="date-filter"
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    type="text"
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    placeholder="End Date"
                    value={endDate}
                    className="date-filter"
                    onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button className="btn btns2" onClick={resetSubmit} > Reset</button>
                <button className="btn btns" onClick={searchSubmit} style={{ marginLeft: "3px" }}> Submit</button>
              </Col>
            </Row>
          </Container>


        </div>
      </div>
    </BaseMarkUp>
  )
}

export default Gists