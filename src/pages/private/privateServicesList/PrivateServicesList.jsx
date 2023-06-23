import { useEffect } from "react";
import { BackButton } from "../../../components/shared/BackButton";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/shared/spinner/Spinner";
import { getServices } from "../../../features/initiation/inititationSlice";
import Ticket from "../../../components/shared/ticket/Ticket";
import { Link } from "react-router-dom";

function PrivateServicesList() {


  const dispatch = useDispatch()
  const { services} = useSelector((state) => state.service)

  useEffect(() => {
    dispatch(getServices())

  }, [dispatch])

console.log(services.data);

  if (!services.data ) {
    return <Spinner />
  }
  return (
    <>
      <section className="headings">
      <BackButton url={'/private/home'} />
        <h1>liste des services</h1>
      </section>
      <section>
        <div className="ticket-headings">
          <p>Nom</p>
          <p>Date de création</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
        {services.data.map((service) => (
            <Ticket key={service.id}>

        
            <div>{service.name}</div>
            <div>{new Date(service.createdAt).toLocaleDateString()}</div>
            <div>{service.unitPrice}</div>
           
            <Link
              to={`/private/details-services/${service.id}`}
              className="btn btn-sm"
              >
              Détail du service
            </Link>
                </Ticket>
       
        ))}
      </section>
    
    </>
  );
}

export default PrivateServicesList;