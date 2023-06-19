import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getWastes, createWaste } from '../../../features/waste/wasteSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import Ticket from '../../../components/shared/ticket/Ticket';
import { Link } from 'react-router-dom';
import { BackButton } from '../../../components/shared/BackButton';
import Modal from '../../../components/shared/modal/Modal';
import SearchBar from '../../../components/shared/searchBar/SearchBar';

const wasteCategoryOptions = [
  'Aluminium',
  'Plastique',
  'Papier',
  'Carton',
  'Déchets alimentaire',
  'Papier confidentiel',
  'Verre',
  'Capsule',
];

const plasticTypeOptions = [
  'PET',
  'PP',
  'HDPE',
  'PEHD',
  'PS',
  'PVC',
  'PLA',
  'Autres',
  'MIX',
];

function PrivateWasteList() {
  const { wastes, isLoading, isError, message } = useSelector((state) => state.waste);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newWasteData, setNewWasteData] = useState({
    wasteCategory: '',
    wasteType: '',
    plasticType: '',
    détails: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getWastes());
  }, [dispatch, isError, message]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWasteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCreateWaste = () => {
    dispatch(createWaste(newWasteData));
    console.log(newWasteData);
    setShowModal(false);
  };

  if (isLoading || !wastes.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className='headings'>
        <BackButton url={'/private/home'} />
        <SearchBar onSearch={handleSearch} />
        <h1>liste des types de déchets</h1>
        <button onClick={() => setShowModal(true)} className='btn btn-block'>
          Créer un nouveau déchet
        </button>
      </section>
      <div className='ticket-headings'>
        <div>Catégorie du déchet</div>
        <div>Type de déchet</div>
        <div>Détails</div>
        <div>Actions</div>
      </div>

      {wastes.data.map((waste) => (
        <Ticket key={waste.id}>
          <div>{waste.wasteCategory}</div>
          <div>{waste.wasteCategory}</div>
          <div>{waste.détails}</div>
          <div>
            <Link to={`/private/waste-details/${waste._id}`} className='btn btn-sm'>
              details
            </Link>
          </div>
        </Ticket>
      ))}

      {showModal && (
        <Modal
          titleModal='Créer un nouveau déchet'
          btnTxt='Créer'
          isOpen={showModal}
          onClose={handleModalClose}
        >
          <div className='form-group'>
            <label htmlFor='wasteCategory'>Catégorie du déchet:</label>
            <select
              id='wasteCategory'
              name='wasteCategory'
              value={newWasteData.wasteCategory}
              onChange={handleInputChange}
            >
              {wasteCategoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {newWasteData.wasteCategory === 'Plastique' && (
            <div className='form-group'>
              <label htmlFor='plasticType'>Type de plastique:</label>
              <select
                id='plasticType'
                name='plasticType'
                value={newWasteData.plasticType}
                onChange={handleInputChange}
              >
                {plasticTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className='form-group'>
            <label htmlFor='détails'>Détails:</label>
            <input
              type='text'
              id='détails'
              name='détails'
              value={newWasteData.détails}
              onChange={handleInputChange}
            />
          </div>
          <button className='btn btn-block' onClick={handleCreateWaste}>Créer</button>
        </Modal>
      )}
    </>
  );
}

export default PrivateWasteList;
