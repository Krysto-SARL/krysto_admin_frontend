import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackButton } from '../../../components/shared/BackButton';
import Spinner from '../../../components/shared/spinner/Spinner';
import { deleteUser, getUser } from '../../../features/user/userSlice';

function PrivateUserDetails() {
  const { user, isLoading, isError, message } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUser(params.id));
  }, [dispatch, isError, message, params.id]);

  const handleDelete = () => {
    dispatch(deleteUser(user.data._id));
    toast.success('Utilisateur supprimé avec succès');
    navigate('/private/gestion-utilisateurs');
  };

  if (isLoading || !user.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/private/gestion-utilisateurs" />
        {user.data.role === 'partner' || user.data.role === 'recyc' ? (
          <>
            <h2>
              Raison sociale : {user.data.compagny.compagnyName} <span>{user.data.email}</span>
            </h2>
            <h2> RIDET : {user.data.compagny.ridet}</h2>
          </>
        ) : (
          <div>Particulier</div>
        )}

        <h2>
          ID de l'utilisateur : {user.data._id} <span className={`status ${user.data.role}`}>{user.data.role}</span>
        </h2>

        <hr />

        <section>
          {user.data.collectPoints &&
            user.data.collectPoints.map((collectPoint) => (
              <div key={collectPoint._id}>
                <p>Identifiant du point de collecte : {collectPoint._id}</p>
                <Link to={`/private/collecte/${collectPoint._id}`} className="btn btn-sm">
                  Détail du point de collecte
                </Link>
              </div>
            ))}
        </section>
      </header>

      <div className="button-container">
        <button className="btn btn-block">Modifier l'utilisateur</button>
        <button className="btn btn-block btn-danger" onClick={handleDelete}>
          Supprimer l'utilisateur
        </button>
      </div>
    </div>
  );
}

export default PrivateUserDetails;
