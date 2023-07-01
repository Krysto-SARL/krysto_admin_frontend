import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/shared/spinner/Spinner";
import { getGarbageTypes } from "../../../features/garbageType/garbageTypeSlice";
import { BackButton } from "../../../components/shared/BackButton";
import Ticket from "../../../components/shared/ticket/Ticket";
import { Link } from "react-router-dom";


function PrivateGarbageTypeList() {


  const dispatch = useDispatch()
  const { garbageTypes} = useSelector((state) => state.garbageType)

  useEffect(() => {
    dispatch(getGarbageTypes())

  }, [dispatch])

console.log(garbageTypes.data);

  if (!garbageTypes.data ) {
    return <Spinner />
  }


  return (
    <>
    <section className="headings">
    <BackButton url={'/private/home'} />
      <h1>liste des types d'ordures</h1>
    </section>
    <section>
      <div className="ticket-headings">
        <p>Nom</p>
        <p>couleur poubelle</p>
        <p>nombre de PAV</p>
        <p>Actions</p>
      </div>
      {garbageTypes.data.map((garbageType) => (
          <Ticket key={garbageType.id}>

      
          <div>{garbageType.name}</div>
          <div>{garbageType.containerColor}</div>
          <div>{garbageType.voluntaryDropPoints.length}</div>
         
          <Link
            to={`/private/ordure-details/${garbageType.id}`}
            className="btn btn-sm"
            >
            Détail du type d'ordure
          </Link>
              </Ticket>
     
      ))}
    </section>
  
  </>
  )
}



export default PrivateGarbageTypeList