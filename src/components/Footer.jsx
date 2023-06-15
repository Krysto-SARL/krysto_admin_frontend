import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
        <ul className='container-flex-center'>
          
          <li>
            <Link to={"/private/documentation"}>Documentation</Link>
            </li>
        
        </ul>
        <p>© 2023 www.krysto.nc - Tous droits réservés.</p>
    </footer>
  )
}

export default Footer