import React from 'react'
import logo from '../assets/logo.jpg'
import myImage from '../assets/image1.jpg'
import {Link}  from 'react-router-dom'

export default function Navbar() {
  return (
      <>
      <nav className="navbar navbar-expand-lg  px-2">
  <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

</nav>

      <div className="container mt-md-5 mt-4">
        <div className="row">
        <div className="col-md-12 carousel">
        <div className="row">
        <div className="col-md-6 my-auto text-content">
          <h4>Find Your Dream Property</h4>
          <p>
            Whether you're looking for a cozy apartment, a luxurious villa, or a prime commercial space, we have the perfect property for you. Our comprehensive listings offer something for everyone. Start your journey towards finding your ideal place with us today.
          </p>
          {/* <button className="btn ">Explore Now</button> */}
        </div>
          <div className="col-md-6">
            <img src={myImage} alt="" />
          </div>
        </div>
      </div>
        </div>
      </div>
      </>
      
  )
}
