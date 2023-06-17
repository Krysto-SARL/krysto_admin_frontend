import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../../components/shared/spinner/Spinner';
import { getOrder } from '../../../features/order/orderSlice';
import Ticket from '../../../components/shared/ticket/Ticket';
import { getProduct } from '../../../features/product/productSlice';

function PrivateOrderDetails() {
  const { order, isLoading, isError, message } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getOrder(params.id));
    dispatch(getProduct());
  }, [dispatch, isError, message, params.id]);

  console.log(order);

  if (isLoading || !order.data || !products.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <h1>Détails de la commande numéro {order.data.numOrder}</h1>
      </section>

      <section className="order-details">
        <div className="ticket-headings">
          <p>Produit ou service</p>
          <p>TGC</p>
          <p>Quantité</p>
          <p>Remise</p>
        </div>
        {order.data.orderLignes.map((orderLigne) => {
          const product = products.data.find((product) => orderLigne.product === product._id);
          return (
            <Ticket className="order-item" key={orderLigne._id}>
              {orderLigne.product ? (
                product ? (
                  <p>{product.designation}</p>
                ) : (
                  <p>Produit non trouvé</p>
                )
              ) : (
                <p>{orderLigne.service}</p>
              )}
              <p>{orderLigne.tgc}%</p>
              <p>{orderLigne.quantity}</p>
              <p>{orderLigne.discount}%</p>
            </Ticket>
          );
        })}
      </section>
    </>
  );
}

export default PrivateOrderDetails;
