import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getWastes } from '../../../features/waste/wasteSlice'
import Spinner from '../../../components/shared/spinner/Spinner'

function PrivateWasteList() {
    const { wastes, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.waste,
      )

      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getWastes())
      }, [dispatch, isError, message])
      console.log(wastes)
    
      if (isLoading || !wastes.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    
  return (
    <section className='headings'>
        <h1>liste des types de déchets</h1>
    </section>
  )
}

export default PrivateWasteList