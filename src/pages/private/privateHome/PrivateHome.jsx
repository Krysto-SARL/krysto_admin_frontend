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
      <Link className="btn" to={'/private/gestion-utilisateurs'}>
        Messages
      </Link>
      <Link className="btn" to={'/private/liste-categorie-produits'}>
        Catégorie produit
      </Link>
      <Link className="btn" to={'/private/liste-produits'}>
        Produits
      </Link>
      <Link className="btn" to={'/private/liste-services'}>
        services
      </Link>
      <Link className="btn" to={'/private/order-liste'}>
        Commandes
      </Link>
      <Link className="btn" to={'/private/collectes'}>
        Point de collecte
      </Link>
      <Link className="btn" to={'/private/collectes'}>
        Collectes
      </Link>
      <Link className="btn" to={'/private/collectes'}>
        Dechets
      </Link>
      <Link className="btn" to={'/private/collectes'}>
        Certificats
      </Link>
      <Link className="btn btn-reverse" to={'/documentation'}>
        Documentation
      </Link>
</section>
    </>
  )
}

export default PrivateHome
