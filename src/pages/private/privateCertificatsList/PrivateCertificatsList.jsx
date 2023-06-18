import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCertificats } from '../../../features/certificat/certificatSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

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
    <>
    <section className='headings'>
        <BackButton url={'/private/home'}/>
        <h1>Liste des certificats</h1>
    </section>
     <div className="ticket-headings">
     <div>Recycleur</div>
     <div>collecte</div>
     <div>Destruction</div>
     <div>Détails</div>
   </div>

   {certificats.data.map((certificat) => (
       <Ticket key={certificat.id}>
       <div>{certificat.recycler.compagny.compagnyName}</div>
        <div>{new Date(certificat.destructionDate).toLocaleDateString()}</div>
        <div>{new Date(certificat.collect.collectDate).toLocaleDateString()}</div>
        
        <Link className='btn btn-reverse btn-sm' to={`/private/certificat-details/${certificat._id}`}>Détails</Link>
     </Ticket>
   ))}
   </>
  )
}

export default PrivateCertificatsList