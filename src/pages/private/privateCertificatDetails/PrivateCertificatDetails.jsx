import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCertificat } from '../../../features/certificat/certificatSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import './privateCertificatDetails.css'
function PrivateCertificatDetails() {
  const { certificat, isLoading, isError, message } = useSelector((state) => state.certificat);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getCertificat(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(certificat);

  if (isLoading || !certificat || !certificat.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
    <section className='headings'>
        <h1>Détails du certificats de destruction</h1>
        <h2>Identifiant du certificat : <span>{certificat.data._id}</span></h2>
    </section>
    <hr />
    <section className='recycleur-info-container'>
            <h2>Infos sur l'entreprise de recyclage</h2>
        <div className="recycler-info">
            <p> <span>Recycleur :</span> {certificat.data.recycler.compagny.compagnyName}</p>
            <p> <span>Ridet :</span> {certificat.data.recycler.compagny.ridet}</p>
            <p> <span>Téléphone :</span> {certificat.data.recycler.contact.phone}</p>
            <p> <span>Mail:</span> {certificat.data.recycler.email}</p>
        </div>

    </section>
    <section>
        <h2>Informations de déstruction</h2>
        <div className='recycler-info'>

    <p><span>Date de déstruction :</span> {new Date(certificat.data.destructionDate).toLocaleDateString()}</p>
    <p><span>Quantité détruite :</span> {certificat.data.collect.quantityCollected}</p>
        </div>
        <p>Remarque et infos suplementaire :</p>
    <div className="destruction-remarque">
        {certificat.data.remarque}
    </div>
    </section>
    </>
  );
}

export default PrivateCertificatDetails;
