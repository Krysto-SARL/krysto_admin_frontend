import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { closeMessage, getMessage } from '../../../features/message/messageSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import { BackButton } from '../../../components/shared/BackButton';

function PrivateMessageDetails() {
  const { messageData, isLoading, isError, message } = useSelector((state) => state.message);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getMessage(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, params.id]);

  const onTicketClose = () => {
    dispatch(closeMessage(messageData.data._id));
    toast.success('Message archivé');
    setTimeout(() => {
      navigate('/private/liste-messages');
    }, 3000);
  };

  if (!messageData.data || isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Une erreur est survenue merci de réessayer.</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/private/liste-messages" />

        <h2>
          objet : {messageData.data.object} <br />
          Date de la demande : {new Date(messageData.data.createdAt).toLocaleDateString()}
          <span></span>
        </h2>
        <hr />

        <h2>
          status :
          <span className={`status message-${messageData.data.status}`}>{messageData.data.status}</span>
        </h2>

        <hr />
        <div className="ticket-desc">
          <h3>Message: </h3>
          <p>{messageData.data.message}</p>
        </div>
      </header>
      {messageData.data.status !== 'Archived' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Archiver le message
        </button>
      )}

    </div>
  );
}

export default PrivateMessageDetails;
