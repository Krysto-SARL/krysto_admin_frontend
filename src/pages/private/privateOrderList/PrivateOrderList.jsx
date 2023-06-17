import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getOrders } from '../../../features/order/orderSlice'
import './orderList.css'
import { Link } from 'react-router-dom'

function PrivateOrderList() {
  const { orders, isLoading, isSuccess, isError } = useSelector(
    (state) => state.order,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  console.log(orders)

  if (isLoading || !orders.data) {
    return <Spinner />
  }

  return (
    <>
      <section className="headings">
        <h1>Liste des commandes</h1>
      </section>

      <section>
        <div className="order-item">
          <p>n° commande</p>
          <p>Date de création</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {orders.data.map((order) => (
          <div className='order-item' key={order.id}>
            <p>{order.numOrder}</p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            <p>{order.status}</p>
            <Link to={`/private/details-commande/${order.id}`} className='btn btn-sm'>détail de la commande</Link>
          </div>
        ))}
      </section>
    </>
  )
}

export default PrivateOrderList
