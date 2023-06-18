import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCollectPoints } from '../../../features/collectPoint/collectPointSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivateCollectPointsList() {
    const { collectPoints, isLoading, isError, message } = useSelector(
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
    <>
    <section className='headings'>
        <BackButton url={'/private/home'}/>
        <h1>Liste des points de collecte</h1>
    </section>
    <section>
    
    <div className="tickets">
        <div className="ticket-headings">
            <div>date de création</div>
            <div >partenaire</div>
            <div>Total recyclé</div>
            <div>Actions
            </div>
        </div>
        {collectPoints.data.map((collectPoint) =>(
            <Ticket>
                <div>{new Date(collectPoint.createdAt).toLocaleDateString()}</div>
                <div>{collectPoint.partnerName}</div>
                <div>{collectPoint.totalRecycled}</div>
                <div>
              
                <Link className='btn btn-sm' to={`/private/details-point-de-collecte/${collectPoint.id}`}>Détails</Link>
                </div>
            </Ticket>
            
        ) )}
    </div>
</section>
    </>
  )
}

export default PrivateCollectPointsList