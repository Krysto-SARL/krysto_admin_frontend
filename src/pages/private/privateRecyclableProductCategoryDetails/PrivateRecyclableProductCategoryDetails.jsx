import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRecyclableProductCategory } from '../../features/recyclableProductCategory/recyclableProductCategorySlice'
import Spinner from '../../components/shared/spinner/Spinner'

function PrivateRecyclableProductCategoryDetails() {

    const { recyclableProductCategory, isLoading, isError, message } = useSelector(
        (state) => state.recyclableProductCategory,
      )
      const params = useParams()
      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getRecyclableProductCategory(params.id))
      }, [dispatch, isError, message, params.id])
    
      console.log(recyclableProductCategory.data)
      if (isLoading || !recyclableProductCategory.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }




      return (
    <>
    <h1>{recyclableProductCategory.data.name}</h1>
    </>
  )
}

export default PrivateRecyclableProductCategoryDetails