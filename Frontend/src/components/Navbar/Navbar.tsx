import React from 'react'
import './navbar.css'
import logo from '../../assets/images/locatrust.png'
//import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav>
        <img src={logo}></img>
            <ul>
                <li><a href="#Footer" className='link'>À propos</a></li>
                <li><a href="#Footer" className='link'>Aide</a></li>
                <li><a href="#Footer" className='link '>Contact</a></li>
                <li><a href="/connection" className='connection-btn'>Connexion</a></li>
                <li><a href="/connection" className='signup-btn'>Inscription</a></li>
            </ul>
        </nav>  
    </div>
  )
}

export default Navbar