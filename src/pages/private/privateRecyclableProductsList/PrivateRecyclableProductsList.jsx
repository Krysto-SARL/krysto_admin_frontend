import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecyclableProducts } from '../../../features/recyclableProduct/recyclableProductSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivateRecyclableProductsList() {
  const dispatch = useDispatch()
  const { recyclableProducts } = useSelector((state) => state.recyclableProduct)

  useEffect(() => {
    dispatch(getRecyclableProducts())
  }, [dispatch])

  console.log(recyclableProducts.data)

  if (!recyclableProducts.data) {
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
          <p>Catégorie</p>
          <p>Marque</p>
          <p>Designation</p>
          <p>Actions</p>
        </div>
        {recyclableProducts.data.map((recyclableProduct) => (
          <Ticket key={recyclableProduct.id}>
            <div>{recyclableProduct.recyclableProductCategory}</div>
            <div>{recyclableProduct.marque}</div>
            <div>{recyclableProduct.designation}</div>

            <Link
              to={`/private/produit-recyclable-details/${recyclableProduct.id}`}
              className="btn btn-sm"
            >
              Détail du produit
            </Link>
          </Ticket>
        ))}
      </section>
    </>
  )
}

export default PrivateRecyclableProductsList
