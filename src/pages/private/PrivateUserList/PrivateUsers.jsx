import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, createUser } from '../../../features/user/userSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import Ticket from '../../../components/shared/ticket/Ticket';
import { Link } from 'react-router-dom';
import { BackButton } from '../../../components/shared/BackButton';
import Modal from '../../../components/shared/modal/Modal';
import { toast } from 'react-toastify';

function PrivateUsers() {
  const { users, isLoading } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateUser = () => {
    dispatch(createUser(newUser)).then(() => {
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: '',
      });
      setShowModal(false);
      toast.success('Utilisateur créé avec succès');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  };

  console.log(users);

  if (isLoading || !users.data) {
    return <Spinner />;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des utilisateurs</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-block">
          Créer un nouvel utilisateur
        </button>
      </section>

      <section className="userList">
        <h2>Liste des utilisateurs</h2>
        <div className="ticket-headings">
          <div>Nom utilisateur</div>
          <div>Email</div>
          <div>Rôle</div>
          <div>Actions</div>
        </div>

        {users.data.map((user) => (
          <Ticket key={user.id}>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            <div>
              <Link
                to={`/private/details-utilisateur/${user.id}`}
                className="btn btn-sm"
              >
                Détail
              </Link>
            </div>
          </Ticket>
        ))}

        {showModal && (
          <Modal
            titleModal="Créer un nouvel utilisateur"
            btnTxt="Créer"
            isOpen={showModal}
            onClose={handleModalClose}
          >
            <div className='form-group'>
              <label>Nom utilisateur:</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Mot de passe:</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Rôle:</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="partner">Partner</option>
                <option value="admin">Admin</option>
                <option value="recycler">Recycler</option>
              </select>
            </div>
            <button className='btn btn-block' onClick={handleCreateUser}>Créer</button>
          </Modal>
        )}
      </section>
    </>
  );
}

export default PrivateUsers;
