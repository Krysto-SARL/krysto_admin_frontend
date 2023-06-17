import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../features/user/userSlice';
import './userItem.css'
function UserItem({ user }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <tr>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className='btn-tableau'> 
        <Link to={`/private/details-utilisateur/${user.id}`} className='btn  btn-sm'>
          details
        </Link>
        <button className='btn btn-danger btn-sm' onClick={handleDelete}>
          Supprimer
        </button>
      </td>
    </tr>
  );
}

export default UserItem;