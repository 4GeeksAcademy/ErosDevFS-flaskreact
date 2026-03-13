import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";

function SignupForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()


    // function sendData(e){
    //     e.preventDefault()
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(
    //             {
    //                 "email": email,
    //                 "password": password
    //             }
    //         )
    //     }
    //     fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", requestOptions)
    //     .then(response=>response.json())
    //     .then(data=>console.log(data))
    // }

    const sendData = async (e)=>{
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        }
        try {
            const response = await
                fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", requestOptions)
                if (response.status === 201){
                    const login = await
                        fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", requestOptions)
                    console.log(login)
                    if(login.status === 200){
                        dispatch({
                            type: 'set_auth',
                            payload: true
                        })
                        localStorage.setItem("auth", "true")
                        const data = await login.json()
                        localStorage.setItem("token", data.access_token)
                        console.log("saved token:", localStorage.getItem("token"))
                        navigate("/demo")
                    }
                }

        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            <h1 className="">Create your account</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default SignupForm