import React, {useState, useEffect} from "react"
import "./login.css"
import {Form, Button } from "react-bootstrap"
import {auth, firestore} from "../../Firebase/firebase"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false)
  






    const signInWithEmailAndPasswordHandler = (e, email,password) => {
        e.preventDefault();
        setLoader(true);
        setTimeout(() => {
            console.log("loader")
            setLoader(false);
        }, 5000);
        if (email.includes("@schooln.ng")) {
            auth.signInWithEmailAndPassword(email, password).then(user =>  {
             window.location.href = '/overview'
             }).catch(error => {
                setError("Error signing in with password and email!");
                console.error("Error signing in with password and email!", error);
            })
        }
        else {
            setError("The Email You Entered is not Authorized to Login");
        }


  
        
    }
    const handleLogin = (email,password) => {
        setLoader(true);
        setTimeout(() => {
            console.log("loader")
            setLoader(false);
        }, 5000);
        signInWithEmailAndPasswordHandler(email,password)
        
    }

    const onChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    }
    return (
        <div>
        <div className="login"> 
            <Form className="login-div">
                <div className="login-sub-div">
                <img src="https://res.cloudinary.com/doouwbecx/image/upload/v1604742745/Schoolng/cir_l_2_w59sua.png" alt="" />
                    <h3 className="admin-login">School Admin Login</h3>
                </div>

                {error !== null && <div className="py-4 w-full texts text-center mb-3">{error}</div>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label><br/>
                    <Form.Control type="email" name="userEmail" className="" id="userEmail" value={email} placeholder="E.g: faruq123@gmail.com" onChange={(e) => onChangeHandler(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your Password" id="userPassword" value={password} name="userPassword" onChange={(e) => onChangeHandler(e)} />
                </Form.Group>
               <div className="login-btn-div">

                     {
                        loader ? (<img src="https://res.cloudinary.com/doouwbecx/image/upload/v1605480900/25_1_f13z4c.gif" alt="" />)
                            :
                            <Button type="submit" className="login-btn" onClick = {(event) => { signInWithEmailAndPasswordHandler(event, email, password)}}>
                                    Login
                            </Button>
                } 
               </div>

            </Form>
        </div>
    </div>
    )
}

export default Login



