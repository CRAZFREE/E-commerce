import React,{useState} from 'react'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {signup} from "../auth/helper"




const Signup = () =>{

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error: "",
        success:false
    });
    
    //destructing the states
    //Whenever the things goes big we make it small 
    //or in programming world we can say that we break down things
    const {name,email,password,error,success} = values;

    //we never directly manipulate these values 
    //we always go through the setvalues
    const handleChange = name => event =>{
        setValues({...values, error: false,[name]:event.target.value})        
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false })
        signup({name,email,password})
            .then(data=>{
                if(data && data.error){
                    setValues({...values,error:data.error,success:false})
                }else{
                    setValues({
                        ...values,
                        name:"",
                        email:"",
                        password:"",                        
                        error:"",
                        success:true
                    });
                }
            })
            .catch(console.log("Error in signup"))
    }

    const signUpForm=()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light ">Name</label>
                            <input 
                                className="form-control" 
                                onChange={handleChange("name")} 
                                type="text"
                                value={name}/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Email</label>
                            <input 
                                className="form-control" 
                                onChange={handleChange("email")}
                                type="email"
                                value={email}/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password</label>
                            <input 
                                className="form-control"
                                onChange={handleChange("password")} 
                                type="password"
                                value={password}/>
                        </div>
                        <br/>
                        <button onClick={onSubmit} className="btn btn-success btn-block form-control" >Submit</button>
                    </form>
                </div>
            </div>
        )
    };

    const successMessage=()=>{
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                    style={{display:success ? "" : "none"}}>
                        New account created SuccessFully. Please{""}
                        <Link to="/signin">Login here</Link>
                </div>
            </div>
        </div>
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



    return (
        <Base title="Signup Page" description="Page for user to signup!">
            <h1>Signup works</h1>
            {/* parenthese means we want to run it right now */}
            {/* and no parenthese means that run it when some event occurs */}
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>

)
}

export default Signup;