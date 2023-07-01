import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlasticTypes } from '../../../features/plasticType/plasticTypeSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'

function PrivatePlasticTypesList() {


    const dispatch = useDispatch()
    const { plasticTypes} = useSelector((state) => state.plasticType)
  
    useEffect(() => {
      dispatch(getPlasticTypes())
  
    }, [dispatch])
  
  console.log(plasticTypes.data);
  
    if (!plasticTypes.data ) {
      return <Spinner />
    }



  return (
    <>
      <section className="headings">
      <BackButton url={'/private/home'} />
        <h1>liste des types de plastiques</h1>
      </section>
      <section>
        <div className="ticket-headings">
          <p>Sigle FR</p>
          <p>Sigle EN</p>
          <p>Nom scientifique</p>
          <p>Actions</p>
        </div>
        {plasticTypes.data.map((plasticType) => (
            <Ticket key={plasticType._id}>

        
            <div>{plasticType.sigleFr}</div>
            <div>{plasticType.sigleEn}</div>
            <div>{plasticType.scientificNameFr}</div>
           
            <Link
              to={`/private/details-type-de-plastique/${plasticType._id}`}
              className="btn btn-sm"
              >
              Détail du type de plastique
            </Link>
                </Ticket>
       
        ))}
      </section>
    
    </>
  )
}

export default PrivatePlasticTypesList