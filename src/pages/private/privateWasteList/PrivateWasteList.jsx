import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getWastes } from '../../../features/waste/wasteSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivateWasteList() {
  const { wastes, isLoading, isError, message } = useSelector((state) => state.waste)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getWastes())
  }, [dispatch, isError, message])

  if (isLoading || !wastes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className='headings'>
        <h1>liste des types de déchets</h1>
      </section>
      <div className="ticket-headings">
        <div>Catégorie du déchet</div>
        <div>Type de déchet</div>
        <div>Détails</div>
        <div>Actions</div>
      </div>

      {wastes.data.map((waste) => (
        <Ticket key={waste.id}>
          <div>{waste.wasteCategory}</div>
          <div>{waste.wasteCategory}</div>
          <div>{waste.détails}</div>
         <div>
          <Link to={`/private/waste-details/${waste._id}`} className='btn btn-sm'>details</Link>
         </div>
        </Ticket>
      ))}
    </>
  )
}

export default PrivateWasteList
