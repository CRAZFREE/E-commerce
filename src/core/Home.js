import React,{useEffect,useState} from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import  getProdcuts  from './helper/coreapicalls'



export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, seterror] = useState(false)
    
    const loadAllProducts = () => {
        getProdcuts()
        .then(data=>{
            if(data.error){
                seterror(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        loadAllProducts()
    },[])

    return (
        <Base title="Home Page">
            <div className="row">
                <h1 className="text-white">All T-Shirts</h1>
                <div className="row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}
