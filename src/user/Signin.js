import React,{useState} from 'react'
import Base from "../core/Base"
import {Link ,Redirect} from "react-router-dom"
import {signin,isAuthenticated,authenticate} from "../auth/helper"

const Signin = () =>{

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    })

    const {email,password,error,loading,didRedirect} =values
    const {user} =isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error: false,[name]:event.target.value})        
    }

    const onSubmit= event=>{
        event.preventDefault();
        setValues({...values, error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error,loading:false})
            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                });
            }
        })
        .catch(console.log("Sign in request failed"))
    }
    const performRedirect = () => {
        if(didRedirect){
            if(user&&user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }
            else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }


    const loadingMessage=()=>{
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
    )}

   const errorMessage=()=>{
       return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{display:error ? "" : "none"}}>
                            {error}
                    </div>
                </div>
            </div>
    )}


    const signInForm=()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">Email</label>
                            <input 
                                onChange={handleChange("email")} 
                                className="form-control" 
                                type="email" 
                                value={email}/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password</label>
                            <input 
                                onChange={handleChange("password")}
                                className="form-control" 
                                type="password" 
                                value={password}/>
                        </div>
                        <br/>
                        <button onClick={onSubmit} className="btn btn-success btn-block form-control">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Signin Page" description="Page for user to signin!">
            <h1>Signin works</h1>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;