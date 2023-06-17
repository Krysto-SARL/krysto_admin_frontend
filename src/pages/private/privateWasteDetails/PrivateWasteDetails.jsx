import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackButton } from '../../../components/shared/BackButton';
import Spinner from '../../../components/shared/spinner/Spinner';

import { getWaste } from '../../../features/waste/wasteSlice';

function PrivateWasteDetails() {
  const { waste, isLoading, isError, message } = useSelector((state) => state.waste);
  const params = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getWaste(params.id));
  }, [dispatch, isError, message, params.id]);


  if (isLoading || !waste.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <div className="ticket-page">
      

     <BackButton  url="/private/liste-types-dechets"/>
    </div>
  );
}

export default PrivateWasteDetails;
