import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../../../features/product/productSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../components/shared/spinner/Spinner';
import Slider from '../../../components/shared/slider/Slider';

function PrivateProductDetail() {
    const { product, isLoading, isError, message } = useSelector((state) => state.product);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
      dispatch(getProduct(params.id));
    }, [dispatch, isError, message, params.id]);

console.log(product.data);
    if (isLoading || !product.data) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>;
      }
  
  return (
    <section className='headings'>
        <h1>{product.data.designation}</h1>
       <div className="container_img">
        <img src={`http://localhost:8080/uploads/${product.data.photo}`} alt="" />
       </div>
    </section>
  )
}

export default PrivateProductDetail