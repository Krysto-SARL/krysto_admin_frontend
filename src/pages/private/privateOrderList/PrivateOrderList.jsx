import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/shared/spinner/Spinner';
import { getOrders } from '../../../features/order/orderSlice';
import './orderList.css';
import { Link } from 'react-router-dom';
import SearchBar from '../../../components/shared/searchBar/SearchBar';
import Ticket from '../../../components/shared/ticket/Ticket';

function PrivateOrderList() {
  const { orders, isLoading } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  if (isLoading || !orders.data) {
    return <Spinner />;
  }

  const filteredOrders = orders.data.filter((order) => {
    const lowerCaseNumOrder = order.numOrder.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return lowerCaseNumOrder.includes(lowerCaseSearchTerm);
  });

  return (
    <>
      <section className="headings">
        <h1>Liste des commandes</h1>
      </section>

      <SearchBar onSearch={handleSearch} />

      <section>
        <div className="ticket-headings">
          <p>n° commande</p>
          <p>Date de création</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {filteredOrders.map((order) => (
          <Ticket key={order.id}>
            <p>{order.numOrder}</p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            <p>{order.status}</p>
            <Link to={`/private/details-commande/${order.id}`} className="btn btn-sm">
              détail de la commande
            </Link>
          </Ticket>
        ))}
      </section>
    </>
  );
}

export default PrivateOrderList;
