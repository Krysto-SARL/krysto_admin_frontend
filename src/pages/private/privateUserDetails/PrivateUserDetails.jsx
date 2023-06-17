import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BackButton } from '../../../components/shared/BackButton'
import Spinner from '../../../components/shared/spinner/Spinner'

import { getUser } from '../../../features/user/userSlice'

function PrivateUserDetails() {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getUser(params.id))
  }, [dispatch, isError, message, params.id])

  if (isLoading || !user.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/private/gestion-utilisateurs" />
        {user.data ? (
          <>
            <h2>
              Raison sociale : {user.data.compagny.compagnyName}{' '}
              <span>{user.email}</span>
            </h2>
            <h2> RIDET : {user.data.compagny.ridet}</h2>
          </>
        ) : (
          <div>Particulier</div>
        )}

        <h2>
          ID de l'utilisateur : {user.data._id}{' '}
          <span className={`status `}>{user.data.role}</span>
        </h2>

        <hr />

        <section>
          {user.data.collectPoints &&
            user.data.collectPoints.map((collectPoint) => (
              <div  key={collectPoint._id}>
              <p>Identifiant du point de collecte : {collectPoint._id}</p>
              <Link className='btn btn-sm'> Detail du point de collecte</Link>
              </div>
            ))}
        </section>
       
      </header>

      <div className="button-container">
        <button className="btn btn-block">Modifier l'utilisateur</button>
        <button className="btn btn-block btn-danger">
          Supprimer l'utilisateur
        </button>
      </div>

      {/* <section>
        <h5>Point de collecte du client</h5>
        {user.collectPoints.map((collectPoint) => (
          <div key={collectPoint._id}>{collectPoint.waste}</div>
          // <CollectItem key={collect._id} collect={collect}/>
        ))}
      </section> */}
    </div>
  )
}

export default PrivateUserDetails
