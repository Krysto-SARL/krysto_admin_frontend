import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getPlasticType } from '../../../features/plasticType/plasticTypeSlice'
import Spinner from '../../../components/shared/spinner/Spinner'

function PrivatePlasticTypeDetails() {
  const { plasticType, isLoading, isError, message } = useSelector(
    (state) => state.plasticType,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPlasticType(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(plasticType.data)
  if (isLoading || !plasticType.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <div>
      <h1>{plasticType.data.scientificNameFr}</h1>
    </div>
  )
}

export default PrivatePlasticTypeDetails
