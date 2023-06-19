import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategory } from '../../../features/productCategory/productCategorySlice';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/shared/spinner/Spinner';
import { toast } from 'react-toastify';
import Ticket from '../../../components/shared/ticket/Ticket';
import Slider from '../../../components/shared/slider/Slider';


function PrivateProductCategoryDetails() {
  const { productCategory, isLoading, isError, message } = useSelector(
    (state) => state.productCategory
  );

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProductCategory(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(productCategory);

  if (isLoading || !productCategory.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <h1>{productCategory.data.name}</h1>
      </section>
      <section>
        <h2>Liste des produits pour cette catégorie</h2>
        <div className="slider-container">
          <Slider  images={productCategory.data.photos} />
        </div>
        <div className="ticket-headings">
          <div>Désignation</div>
          <div>Référence</div>
          <div>Prix unitaire</div>
          <div>Détails</div>
        </div>
        {productCategory.data.products.map((product) => (
          <Ticket key={product.id}>
            <div>{product.designation}</div>
            <div>{product.reference}</div>
            <div>{product.unitPrice} XPF</div>
            <Link className="btn btn-sm" to={`/private/details-produit/${product._id}`}>
              Détails
            </Link>
          </Ticket>
        ))}
      </section>
    </>
  );
}

export default PrivateProductCategoryDetails;
