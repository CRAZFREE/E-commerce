import React from 'react'
import Menu from './Menu';

// function myage(){

// }

const Base = ({
    title="My Tilte",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=> (
    <div>
        <Menu/>
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center py-3">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{description}</p>    
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3">
            <div className="container-fluid bg-success text-white text-center">
                <h4>If you got some questions, feel free to reach out!!</h4>
                <button className="btn btn-warning btn-lg">Contact Us</button>
            </div>
            <div className="container">
                <span className="text-muted">An amazing place to buy T-shirt</span>
            </div>
        </footer>
    </div>
    

)


export default Base;