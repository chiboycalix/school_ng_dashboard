import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"



function ImageModal({ shows, onHides, id, user }) {
    return (
        <div>
            <Modal show={shows} onHide={onHides} aria-labelledby="contained-modal-title-vcenter" centered animation={false} size="lg">
                <Modal.Header closeButton id="contained-modal-title-vcenter" onClick={onHides}>
                </Modal.Header>
                <Modal.Body>
                    {
                        Object.values(user.postContent.imgarray).map((imgs, i) => i === id ? <img src={imgs.imgurl} alt={i} className="modal-img-display" /> : "")
                    }

                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ImageModal
