import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getCollectPoints,
  createNewCollectPoint,
} from '../../../features/collectPoint/collectPointSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import { BackButton } from '../../../components/shared/BackButton';
import Ticket from '../../../components/shared/ticket/Ticket';
import { Link } from 'react-router-dom';
import Modal from '../../../components/shared/modal/Modal';
import { getUsers } from '../../../features/user/userSlice';
import { getWastes } from '../../../features/waste/wasteSlice';
import SearchBar from '../../../components/shared/searchBar/SearchBar';

function PrivateCollectPointsList() {
  const { collectPoints, isLoading, isError, message } = useSelector(
    (state) => state.collectPoint
  );
  const [searchTerm, setSearchTerm] = useState('');
  const { users } = useSelector((state) => state.user);
  const { wastes } = useSelector((state) => state.waste);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newCollectPoint, setNewCollectPoint] = useState({
    user: '',
    description: '',
    address: '',
    waste: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getCollectPoints());
    dispatch(getUsers());
  }, [dispatch, isError, message]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getWastes());
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'user') {
      const selectedUser = users.data.find((user) => user.id === value);
      setNewCollectPoint({
        ...newCollectPoint,
        user: value,
      });
      setSelectedUser(selectedUser);
    } else {
      setNewCollectPoint({
        ...newCollectPoint,
        [name]: value,
      });
    }
  };
  
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCreateCollectPoint = () => {
    // Code pour créer un nouveau point de collecte...

  };

  if (isLoading || !collectPoints.data || !users.data || !wastes.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  // Filtrer les points de collecte en fonction de la recherche
  const filteredCollectPoints = collectPoints.data.filter((collectPoint) => {
    const partnerName = collectPoint.partnerName.toLowerCase();
    return partnerName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <section className='headings'>
        <BackButton url={'/private/home'} />
        <SearchBar onSearch={handleSearch} />
        <h1>Liste des points de collecte</h1>
        <button onClick={() => setShowModal(true)} className='btn btn-block'>
          Créer un nouveau point de collecte
        </button>
      </section>
      <section>
        <div className='tickets'>
          <div className='ticket-headings'>
            <div>date de création</div>
            <div>partenaire</div>
            <div>Total recyclé</div>
            <div>Actions</div>
          </div>
          {filteredCollectPoints.map((collectPoint) => (
            <Ticket key={collectPoint.id}>
              <div>{new Date(collectPoint.createdAt).toLocaleDateString()}</div>
              <div>{collectPoint.partnerName}</div>
              <div>{collectPoint.totalRecycled}</div>
              <div>
                <Link
                  className='btn btn-sm'
                  to={`/private/details-point-de-collecte/${collectPoint.id}`}
                >
                  Détails
                </Link>
              </div>
            </Ticket>
          ))}
        </div>
      </section>
      {showModal && (
        <Modal
          titleModal='Créer un nouveau point de collecte'
          btnTxt='Créer'
          isOpen={showModal}
          onClose={handleModalClose}
        >
          <div className='form-group'>
            <label>Description :</label>
            <input
              type='text'
              name='description'
              value={newCollectPoint.description}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Partenaire :</label>
            <select
              name='user'
              value={newCollectPoint.user}
              onChange={handleInputChange}
            >
              <option value=''>Sélectionnez un partenaire</option>
              {users.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label>Adresse :</label>
            <input
              type='text'
              name='address'
              value={newCollectPoint.address}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label>Déchet :</label>
            <select
              name='waste'
              value={newCollectPoint.waste}
              onChange={handleInputChange}
            >
              <option value=''>Sélectionnez un type de déchet</option>
              {wastes.data.map((waste) => (
                <option key={waste.id} value={waste.id}>
                  {waste.wasteType}
                </option>
              ))}
            </select>
          </div>
          <button className='btn btn-block' onClick={handleCreateCollectPoint}>
            Créer
          </button>
        </Modal>
      )}
    </>
  );
}

export default PrivateCollectPointsList;
