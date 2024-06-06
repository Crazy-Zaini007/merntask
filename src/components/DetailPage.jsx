import React,{useState, useEffect} from 'react'
import {useParams}  from 'react-router-dom'

export default function DetailPage() {
    const[details,setDetails]=useState('')
    const { id }=useParams()

    const getDetails=async()=>{
        try {
         const response=await fetch('http://localhost:3003/listings/')
         
         const json=await response.json()
 
         if(response.ok){
           setDetails(json)
         }
         if(!response.ok){
            throw new Error('Failed to fetch listing');
         }
        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        getDetails()
    }, [id])

let propertyDetails=details && details.find((p)=>p.id===id)

  return (
    <div>
      <div className="container details mb-4">
        <div className="row">
        <h2 className='text-center my-4'>See Details</h2>
        <div className="col-md-10">
            <div className="row">
                <div className="col-md-7">
                    <img src={propertyDetails && propertyDetails.imageUrl} alt="" />
                </div>
                <div className="col-md-5">
                    <h6>{propertyDetails.title}</h6>
                    <ul>
                        <li className='my-1'><i className="fa-solid fa-list me-2"></i>Property Type: <span>{propertyDetails.propertyType}</span></li>
                        <li className='my-1'><i className="fa-solid fa-check-to-slot me-2"></i>Commercial: <span>{propertyDetails.isCommercial?"Yes":"No"}</span></li>
                        <li className='my-1'><i className="fa-regular fa-square me-2"></i>Covered Area: <span>{propertyDetails.coveredAreaSQFT} SQFT</span></li>
                        <li className='my-1'><i className="fa-solid fa-bed me-2"></i>No of Beds: <span>{propertyDetails.beds}</span></li>
                        <li className='my-1'><i className="fa-solid fa-bath me-2"></i>No of Bathrooms: <span>{propertyDetails.bath}</span></li>
                        <li className='my-1'><i className="fa-solid fa-location-dot me-2"></i>Address: <span>{propertyDetails.address}</span></li>
                        <li className='my-1'><i className="fa-solid fa-money-check me-2"></i>Price: <span>{propertyDetails.price} PKR</span></li>
                        
                    </ul>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
