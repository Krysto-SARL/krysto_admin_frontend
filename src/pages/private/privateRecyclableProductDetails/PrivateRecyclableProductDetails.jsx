import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getRecyclableProduct,
  deleteRecyclableProduct,
  addRecyclableProductPhoto
} from '../../features/recyclableProduct/recyclableProductSlice';
import Spinner from '../../components/shared/spinner/Spinner';
import Modal from '../../components/shared/modal/Modal';

function PrivateRecyclableProductDetails() {
  const { recyclableProduct, isLoading, isError, message } = useSelector(
    (state) => state.recyclableProduct
  );
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true);
  };

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photoFile);
    dispatch(addRecyclableProductPhoto({ recyclableProductId: recyclableProduct.data.id, photo: formData }))
      .then(() => {
        toast.success('Photo ajoutée avec succès.');
        setIsNewProductModalOpen(false);
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`);
      });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getRecyclableProduct(params.id));
  }, [dispatch, isError, message, params.id]);

  const handleDelete = () => {
    dispatch(deleteRecyclableProduct(params.id))
      .then(() => {
        toast.success('Le produit recyclable a été supprimé avec succès.');
        navigate('/private/liste-produits-recyclable');
      })
      .catch(() => {
        toast.error("Une erreur s'est produite lors de la suppression du produit recyclable.");
      });
  };

  if (isLoading || !recyclableProduct.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className='header-recyclable-product'> 
   

        <Modal
          titleModal="Ajouter ou changer votre photo"
          isOpen={isNewProductModalOpen}
          onClose={closeNewProductModal}
        >
          <div>
            <form className="add-logo-form" onSubmit={handlePhotoSubmit}>
              <div className="form-group">
                <p></p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {previewImage && (
                  <img
                    className="photo-preview"
                    src={previewImage}
                    alt="Preview"
                  />
                )}
              </div>
              <button className="btn" type="submit">
                Ajouter
              </button>
            </form>
          </div>
        </Modal>

        <div className="recyclable-product-img-container">
        <button onClick={openNewProductModal} className="btn">
          Ajouter une photo
        </button>
          <img
            className="profil-logo"
            src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${recyclableProduct.data.photo}`}
            alt=""
          />
        </div>
      </section>
     <div className="title-container-recyclable-product">
      <h3 className="category-item">{recyclableProduct.data.recyclableProductCategory.name}</h3>
      <h1>{recyclableProduct.data.designation}</h1>
     </div>
      <button onClick={handleDelete} className="btn btn-block btn-danger">
        Supprimer ce produit recyclable
      </button>
    </>
  );
}

export default PrivateRecyclableProductDetails;
