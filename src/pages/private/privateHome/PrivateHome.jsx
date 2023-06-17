import React from 'react'
import { Link } from 'react-router-dom'

function PrivateHome() {
  return (
    <>
    <section className="heading">
        <h1>Que voulez vous faire ?</h1>
    </section>
<section>

      <Link className="btn" to={'/private/gestion-utilisateurs'}>
        Utilisateurs
      </Link>
      <Link className="btn" to={'/private/order-liste'}>
        Commandes
      </Link>
      <Link className="btn btn-reverse" to={'/documentation'}>
        Documentation
      </Link>
</section>
    </>
  )
}

export default PrivateHome
