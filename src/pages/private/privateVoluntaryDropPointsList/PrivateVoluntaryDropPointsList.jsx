import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getVoluntaryDropPoints,
} from '../../../features/voluntaryDropPoint/voluntaryDropPointSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivateVoluntaryDropPointsList() {
  const dispatch = useDispatch()
  const { voluntaryDropPoints } = useSelector(
    (state) => state.voluntaryDropPoint,
  )

  useEffect(() => {
    dispatch(getVoluntaryDropPoints())
  }, [dispatch])

  console.log(voluntaryDropPoints.data)

  if (!voluntaryDropPoints.data) {
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
        <p>Organisme</p>
        <p>Marque</p>
        <p>Designation</p>
        <p>Actions</p>
      </div>
      {voluntaryDropPoints.data.map((voluntaryDropPoint) => (
        <Ticket key={voluntaryDropPoint.id}>
 
          <div>{voluntaryDropPoint.organisme}</div>
          <div>{voluntaryDropPoint.email}</div>
          <div>{voluntaryDropPoint.telephone}</div>

          <Link
            to={`/private/points-apport-volontaires-details/${voluntaryDropPoint.id}`}
            className="btn btn-sm"
          >
            Détail du PAV
          </Link>
        </Ticket>
      ))}
    </section>
  </>
  )
}

export default PrivateVoluntaryDropPointsList
