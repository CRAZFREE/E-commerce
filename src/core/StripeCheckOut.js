import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import Stripe from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheckOut= (
    {
        products,
        setReload=f=>f,
        reload=undefined
    }) =>{

        const [data,setData] =useState({
            loading:false,
            success:false,
            error:"",
            address:""
        });

        const token =isAuthenticated() && isAuthenticated().token
        const userId = isAuthenticated()&&isAuthenticated().user._id

        const getFinalPrice = () =>{
            let amount =0;
            products.map(p => {
                amount = amount+p.price;
            });
            return amount;
        }

        const makePayment = token =>{
            const body={
                token,
                products
            }
            const headers ={
                "Content-Type": "application/json"
            }
            return fetch(`${API}/stripepayment`,{
                method:"POST",
                headers,
                body:JSON.stringify(body)
            }).then(response=>{
                console.log(response)
                //call further methods
                const {status} = response;
                console.log("STATUS" ,status);
                cartEmpty();
            }).catch(error=>console.log(error))
        }
        const showStripeButton = () =>{
            return isAuthenticated() ? (
            <Stripe
            stripeKey="pk_test_51IfehqSDyHZrFpW75exMVqUDRB9x2NSiLxpgaqVHVyzfYNZiS8RvNsgH4I10s3tALmbOcSHtOHlHSJNeF5TZw9BH00lFrCRmBh"
            token={makePayment}
            amount={getFinalPrice()*100}
            name="Buy T-Shirts"
            shippingAddress
            billingAddress
            bitcoin
            >    
                <button className="btn btn-success">Pay with Stripe</button>  
            </Stripe>      
            ) : (
                <Link to="/signin">
                    <button className="btn btn-warning">Signin</button>
                </Link> 
            ); 
        }

        const showPeopleButton = () =>{
            return isAuthenticated() ? (
                <Link to="/dai">
                <button className="btn btn-success" >Pay with Dai Coin</button>
                </Link>      
            ):(
                <Link to="/signin">
                    <button className="btn btn-warning">Signin</button>
                </Link> 
            ); 
        }

        
    
    return (
        <div>
            <h3 className="text-white">Stripe checkout {getFinalPrice()} </h3>
            <h3>{showStripeButton()}</h3>
            <h3>{showPeopleButton()}</h3>

        </div>
    )
}

export default StripeCheckOut;
