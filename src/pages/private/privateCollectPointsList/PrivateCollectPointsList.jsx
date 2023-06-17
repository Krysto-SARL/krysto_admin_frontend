import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCollectPoints } from '../../../features/collectPoint/collectPointSlice'
import Spinner from '../../../components/shared/spinner/Spinner'

function PrivateCollectPointsList() {
    const { collectPoints, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.collectPoint,
      )

      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getCollectPoints())
      }, [dispatch, isError, message])
      console.log(collectPoints)
    
      if (isLoading || !collectPoints.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    
  return (
    <section className='headings'>
        <h1>Liste des points de collecte</h1>
    </section>
  )
}

export default PrivateCollectPointsList