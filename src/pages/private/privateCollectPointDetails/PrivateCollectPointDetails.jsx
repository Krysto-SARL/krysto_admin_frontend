import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewCollect,
  getCollectPoint
} from "../../../features/collectPoint/collectPointSlice";
import Spinner from "../../../components/shared/spinner/Spinner";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { BackButton } from "../../../components/shared/BackButton";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import CollectItem from "../../../components/CollectItem";

function PrivateCollectPointDetails() {
    const { collectPoint, isLoading, isError, message } = useSelector(
        (state) => state.collectPoint
      );
      const params = useParams();
      const dispatch = useDispatch();
    
      useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        dispatch(getCollectPoint(params.id));
        // eslint-disable-next-line
      }, [isError, message, params.id]);
    
    console.log(collectPoint);
       const newCollect = () => {
        const verifyIfCollect = collectPoint.data.collects.filter((collect) => collect.status === "todo")
        console.log(verifyIfCollect);
        if(verifyIfCollect.length > 0) {
          toast.error('une collecte à déja ete demander')
        } else {
          dispatch(createNewCollect(params.id))
          toast.success('La demande de collecte a bien ete effectuer')
          setTimeout(() => {
            
            window.location.reload()
          }, 500);
        }
        
        
     
      }
    
    
    
      if (!collectPoint.data || isLoading) {
        return <Spinner />;
      }
      if (isError) {
        return <h3>Une erreur est survenue merci de réesayer.</h3>;
      }
  
  return (
    <>
    {collectPoint.data.collects
            .filter((collect) => collect.status === "todo")
            .map((collect) => (
              <>
              <h4>Une collecte en cours ...</h4>
              <CollectItem key={collect.id} collect={collect} />
         </>
            ))}
           
           
    <button onClick={newCollect} className="btn btn-block btn-danger">Demander une collecte</button>
      
      
      <section className="heading">
        <BackButton url={"/private/collects-todo"} />
        <h3>Détail point de collecte</h3>
        <p> identifiant : {collectPoint.data.id}</p>
        {collectPoint.data.collects.length === 0 ? (
          <p>Aucune collecte effectuée pour le moment</p>
        ) : (
          <p>
            Nombre de collectes effectuée : {collectPoint.data.collects.length}
          </p>
        )}
      </section>
      <div className="ticket-page">
        <header className="ticket-header">
          <h2>
            Client : {collectPoint.data.partnerName} <br />
            Date de création :{" "}
            {new Date(collectPoint.data.createdAt).toLocaleDateString()}
            <span>
              <div>
                <QRCode
                  value={`${process.env.REACT_APP_BASE_FRONT_URL}` + "/" + `${collectPoint?.data?.id}`}
                />
              </div>
            </span>
          </h2>
          <h2>Total déchet collecté : <span>{collectPoint.data.totalRecycled} KG</span></h2>
          <hr />

          {/* <h2>
         status :
          <span className={`status collect-${collect.data.status}`}>
            {collect.data.status}
          </span>
        </h2> */}

          <hr />
          <div className="ticket-desc">
            <h3>Remarque: </h3>
            <p>{collectPoint.data.description}</p>
          </div>
          <div className="ticket-desc">
            <h3>Adresse: </h3>
            <p>{collectPoint.data.location.formattedAddress}</p>
          </div>
        </header>
        <h3 className="title">Geolocalisation</h3>
        <div className="leaflet-container">

        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[collectPoint.data.location.coordinates[1],collectPoint.data.location.coordinates[0]]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[collectPoint.data.location.coordinates[1],collectPoint.data.location.coordinates[0]]}>
            <Popup>
              {collectPoint.data.location.formattedAddress} <br />
            </Popup>
          </Marker>
         
        </MapContainer>
 
      </div>
        <section>
          <h3 className="title">Historique des collectes</h3>
          <div className="ticket-headings">
            <div>date demande</div>
            <div>quantité collecté</div>
            <div >status</div>
            <div >voir</div>
        </div>
          {collectPoint.data.collects
            .filter((collect) => collect.status === "done")
            .map((collect) => (
              <CollectItem key={collect.id} collect={collect} />
            ))}
        </section>

   

      </div>
      
    </>
  )
}

export default PrivateCollectPointDetails