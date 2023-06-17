import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCertificats } from '../../../features/certificat/certificatSlice'
import Spinner from '../../../components/shared/spinner/Spinner'

function PrivateCertificatsList() {
    const { certificats, isLoading, isError, message } = useSelector(
        (state) => state.certificat,
      )

      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getCertificats())
      }, [dispatch, isError, message])
      console.log(certificats)
    
      if (isLoading || !certificats.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    
  return (
    <section className='headings'>
        <h1>Liste des certificats</h1>
    </section>
  )
}

export default PrivateCertificatsList