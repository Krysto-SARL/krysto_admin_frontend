import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getRecyclableProductCategories } from '../../../features/recyclableProductCategory/recyclableProductCategorySlice'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivateRecyclableProductCategoriesList() {
  const dispatch = useDispatch()
  const { recyclableProductCategories } = useSelector(
    (state) => state.recyclableProductCategory,
  )

  useEffect(() => {
    dispatch(getRecyclableProductCategories())
  }, [dispatch])

  console.log(recyclableProductCategories.data)

  if (!recyclableProductCategories.data) {
    return <Spinner />
  }

  return (
    <>
    <section className="headings">
    <BackButton url={'/private/home'} />
      <h1>liste des categories de produits recyclable</h1>
    </section>
    <section>
      <div className="ticket-headings">
        <p>Date de création</p>
        <p>Nom</p>
        <p>Nombre de produit recyclable</p>
        <p>Actions</p>
      </div>
      {recyclableProductCategories.data.map((recyclableProductCategory) => (
          <Ticket key={recyclableProductCategory.id}>

      
          <div>  {new Date(recyclableProductCategory.createdAt).toLocaleDateString()}</div>
          <div>{recyclableProductCategory.name}</div>
          <div>{recyclableProductCategory.recyclableProducts.length}</div>
         
          <Link
            to={`/private/ordure-details/${recyclableProductCategory.id}`}
            className="btn btn-sm"
            >
            Détail de la catégorie
          </Link>
              </Ticket>
     
      ))}
    </section>
  
  </>
  )
}

export default PrivateRecyclableProductCategoriesList
