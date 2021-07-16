import React, { useState, useEffect } from 'react'
import HeaderNav from '../HeaderNav'
import "./newadmin.css"
import firebase from "firebase"
import { auth, firestore, secondAuth, storage } from "../../Firebase/firebase"


function NewAdmin() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [type, setType] = useState("")
    const [file, setFile] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const [urls, setUrls] = useState("");
    const [progress, setProgress] = useState(0)




    const createAdmin = (e) => {

        secondAuth.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firestore.collection("Admin")
                    .doc()
                    .set({
                        fullName,
                        email,
                        type,
                        phoneNumber,
                        password,
                        image: urls,
                        created_on: firebase.firestore.FieldValue.serverTimestamp()
                    })

                alert("Congratulations, you have successfully created a new admin")
                setFullName("")
                setEmail("")
                setType("")
                setPhoneNumber("")
                setPassword("")
                setProgress(0)
                setUrls("")
                secondAuth.auth().signOut()
            })
            .catch(err => {
                console.log({ err })
            })
    }




    const handleChange = (event) => {

        if (event.target.files[0]) {
            setImageUrl(event.target.files[0])
        }
        const imageUrls = event.target.files[0]
        const imgName = event.target.files[0].name

        const uploadFile = storage.ref(`profile pictures/${imgName}`).put(imageUrls)

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
                storage.ref("profile pictures")
                    .child(imgName)
                    .getDownloadURL()
                    .then(url => {
                        console.log({ url })
                        setUrls(url)
                    })
            }
        )

    }


    return (
        <div>
            <HeaderNav />
            <div className="app-div">
                <div className="create">
                    <form className="create-form">
                        <h2>Create New Admin</h2>
                        <div class="wrap">
                            <div class="form-group">
                                <label className="custom-file-upload">
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleChange}
                                    />
                                    <img src="https://res.cloudinary.com/doouwbecx/image/upload/v1618006632/Schoolng/Group_oi4rfp.png" alt="" />
                                </label>
                                <div className="progress">
                                    <div>
                                        <label for="file" className="logo-upload">Profile Uploading progress:</label>
                                        <progress value={progress} max="100" className="progressbar" />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="create-div">
                            <label>Full Name</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>

                        <div className="create-div">
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="create-div">
                            <select vlue={type} onChange={(e) => setType(e.target.value)}>
                                <option>Type</option>
                                <option value="super">Super Admin</option>
                                <option value="admin">Normal Admin</option>
                            </select>
                        </div>

                        <div className="create-div">
                            <label>Phone Number</label>
                            <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div className="create-div">
                            <label>Create Password</label>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="admin-create">
                            <button type="button" className="but-create" onClick={() => createAdmin()} disabled={urls === ""}>Create Admin</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewAdmin
