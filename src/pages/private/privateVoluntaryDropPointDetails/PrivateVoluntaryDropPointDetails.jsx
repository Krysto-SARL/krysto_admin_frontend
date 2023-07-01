import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getVoluntaryDropPoint } from '../../../features/voluntaryDropPoint/voluntaryDropPointSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { BackButton } from '../../../components/shared/BackButton'

function PrivateVoluntaryDropPointDetails() {
  const { voluntaryDropPoint, isLoading, isError, message } = useSelector(
    (state) => state.voluntaryDropPoint,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getVoluntaryDropPoint(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(voluntaryDropPoint.data)
  if (isLoading || !voluntaryDropPoint.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/liste-points-apport-volontaires'} />
        <h3>Détails du point d'apport volontaire</h3>
      </section>
      <div className="ticket-page">
        <header className="ticket-header">
          <h2>
            <span>Organisme</span> {voluntaryDropPoint.data.organisme}
          </h2>
          {voluntaryDropPoint.data.garbageTypes.map((garbage) => (
            <h2>
              <span>déchets</span> {garbage.name}
            </h2>
          ))}
        </header>
      </div>
      <section>
        <h3 className="title">Geolocalisation</h3>

        <div className="leaflet-container">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[
              voluntaryDropPoint.data.location.coordinates[1],
              voluntaryDropPoint.data.location.coordinates[0],
            ]}
            zoom={14}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                voluntaryDropPoint.data.location.coordinates[1],
                voluntaryDropPoint.data.location.coordinates[0],
              ]}
            >
              <Popup>
                {voluntaryDropPoint.data.location.formattedAddress} <br />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </>
  )
}

export default PrivateVoluntaryDropPointDetails
