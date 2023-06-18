import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../../components/shared/spinner/Spinner';
import './privateMessagesList.css';

import { getMessages } from '../../../features/message/messageSlice';
import Ticket from '../../../components/shared/ticket/Ticket';
import { Link } from 'react-router-dom';
import { BackButton } from '../../../components/shared/BackButton';

function PrivateMessagesList() {
  const { messages, isLoading, isError, message } = useSelector(
    (state) => state.message,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getMessages());
  }, [dispatch, isError, message]);
  console.log(messages);

  if (isLoading || !messages.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Listes des messages</h1>
        <div className="info-box-messages">
          <div>
            Messages archivés :{' '}
            <span className="warning">
              {messages.data.filter(
                (message) => message.status === 'archived',
              ).length}{' '}
            </span>{' '}
          </div>
          <div>
            Messages Non Lus :{' '}
            <span>
              {' '}
              {messages.data.filter(
                (message) => message.status === 'not_read',
              ).length}{' '}
            </span>{' '}
          </div>
        </div>
      </section>
      <section>
        <div className="tickets">
          <div className="ticket-headings">
            <div>date</div>
            <div>objet</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {messages.data
            .filter((message) => message.status === 'not_read')
            .map((message) => (
              <Ticket key={message._id}>
                <div>
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
                <div>{message.object}</div>
                <div>{message.status}</div>
                <Link
                  className="btn btn-sm"
                  to={`/private/message-details/${message._id}`}
                >
                  Voir le message
                </Link>
              </Ticket>
            ))}
        </div>
      </section>
    </>
  );
}

export default PrivateMessagesList;
