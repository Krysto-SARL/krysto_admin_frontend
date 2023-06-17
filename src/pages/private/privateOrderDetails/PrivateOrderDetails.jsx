import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'

import { getOrder } from '../../../features/order/orderSlice'

function PrivateOrderDetails() {
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getOrder(params.id))
  }, [dispatch, isError, message, params.id])
  console.log(order)

  if (isLoading || !order.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <h1>Details de la commande numéros {order.data.numOrder}</h1>
      </section>

      <section className="order-details">
        <div className="order-item">
            <p>Produit ou service</p>
            <p>TGC</p>
            <p>Quantité</p>
            <p>Remise</p>
        </div>
        {order.data.orderLignes.map((orderLigne) => (
          <div   className="order-item" key={orderLigne._id}>
            {orderLigne.product ? (
              <p>{orderLigne.product}</p>
            ) : (
              <p>{orderLigne.service}</p>
            )}
            <p>{orderLigne.tgc}%</p>
            <p>{orderLigne.quantity}</p>
            <p>{orderLigne.discount}%</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default PrivateOrderDetails
