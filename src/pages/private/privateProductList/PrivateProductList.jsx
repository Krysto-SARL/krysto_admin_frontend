import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getProducts } from '../../../features/product/productSlice'
import { Link } from 'react-router-dom'

function PrivateProductList() {
  const { products, isLoading, isSuccess, isError } = useSelector(
    (state) => state.product,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  console.log(products)

  if (isLoading || !products.data) {
    return <Spinner />
  }
  return (
    <>
      <section className="headings">
        <h1>Gestions des produits</h1>
      </section>

      <section>

      {products.data.map((product) => (
          <div className='order-item' key={product.id}>
            <p>{product.refference}</p>
            <p>{new Date(product.createdAt).toLocaleDateString()}</p>
            <p>{product.designation}</p>
            <Link to={`/private/details-produit/${product.id}`} className='btn btn-sm'>détail du produit</Link>
          </div>
        ))}
      </section>
    </>
  )
}

export default PrivateProductList
