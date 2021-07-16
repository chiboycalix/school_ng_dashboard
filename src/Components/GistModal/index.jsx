import React, { useState } from "react"
import { Modal, Button, Container, Row, Col, Carousel } from "react-bootstrap"
import "./gist-modal.css"
import ShowMoreText from 'react-show-more-text';


function GistModal(props) {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  }

  const postComment = (gistId) => {
    return props.users && props.users.map(user => {
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
    return props.users && props.users.map(user => {
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
    return props.users && props.users.map(user => {
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>

        <div>
          {
            props.schGists && props.schGists.map(sch => {
              return sch.postid === props.id ?
                (
                  <Container fluid>
                    <Row>
                      <Col xs="12" className="modal-gist">
                        <div className="allgist-div1">
                          <img src={sch.userDp} alt="" className="gist-image" />
                          <div className="allgist-div1-sub">
                            <p className="allgist-div1-sub-header">{sch.user.username}</p>
                            <p className="allgist-div1-sub-text">{new Date(sch.date).toDateString()}</p>
                          </div>
                        </div>

                        <div className="pimst">
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
                              <p className="textss">{sch.text}</p>
                            </ShowMoreText>
                          </div>

                          <div>
                            {
                              sch.sharedpost ?
                                (
                                  <div className="shared">
                                    <span style={{ fontSize: "10px", color: "grey" }}> <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" /> Reposted</span>
                                    <p>{sch.sharedpost.text}</p>
                                    <img src={sch.sharedpost.imgarray ? sch.sharedpost.imgarray[0].imgurl : undefined} alt="" className="modal-image" />
                                  </div>
                                ) : undefined
                            }
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '4%' }}>
                            {
                              sch.videourl ?
                                <video controls className="video">
                                  <source src={sch.videourl} type="video/mp4" />
                                </video>
                                : sch.imgarray ?
                                  <Carousel activeIndex={index} onSelect={handleSelect}>

                                    {sch.imgarray.map(ab => {
                                      return <Carousel.Item>
                                        <img
                                          className="d-block w-100 modal-image"
                                          src={ab.imgurl}
                                          alt=""

                                        />
                                      </Carousel.Item>
                                    })}

                                  </Carousel>


                                  : ""
                            }

                            {/* {props.Flag.includes(sch.postid) ? <img src="https://img.icons8.com/ios-filled/24/FF0000/flag.png" alt="" /> : ""} */}
                          </div>

                        </div>

                        <div className="action">
                          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                            <img src="https://img.icons8.com/ios-glyphs/14/000000/chat.png" alt="" />
                            <p className="list">{postComment(sch.postid)} comment</p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                            <img src="https://img.icons8.com/ios-glyphs/14/000000/filled-like.png" alt="" />
                            <p className="list">{postLikes(sch.postid)} like</p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px' }}>
                            <img src="https://img.icons8.com/material-two-tone/14/000000/retweet.png" alt="" />
                            <p className="list">{repost(sch.postid)} Regist</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                ) : ""
            })
          }
        </div>


        {/* <h4>{props.id}</h4> */}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GistModal