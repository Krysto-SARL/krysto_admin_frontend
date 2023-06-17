import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getProductCategories } from '../../../features/productCategory/productCategorySlice'
import { Link } from 'react-router-dom'

function PrivateProductCategoriesList() {
    const { productCategories, isLoading, isSuccess, isError } = useSelector(
        (state) => state.productCategory,
      )
    
      const dispatch = useDispatch()
    
      useEffect(() => {
        dispatch(getProductCategories())
      }, [dispatch])
    
      console.log(productCategories)
    
      if (isLoading || !productCategories.data) {
        return <Spinner />
      }
  return (
    <>
    <section className="headings">
        <h1> liste des catégories de produits</h1>
    </section>
    </>
  )
}

export default PrivateProductCategoriesList