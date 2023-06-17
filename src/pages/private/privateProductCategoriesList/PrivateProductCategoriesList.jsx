import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/shared/spinner/Spinner';
import {
  getProductCategories,
  createProductCategory,
} from '../../../features/productCategory/productCategorySlice';
import { Link } from 'react-router-dom';
import Modal from '../../../components/shared/modal/Modal';
import Ticket from '../../../components/shared/ticket/Ticket';



function PrivateProductCategoriesList() {
  const { productCategories, isLoading} = useSelector(
    (state) => state.productCategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  console.log(productCategories);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false);
  };

  const handleNewCategorySubmit = () => {
    if (!newCategoryName) {
      // Affichez un message d'erreur ou effectuez une action appropriée lorsque le nom de la catégorie est manquant
      return;
    }

    const newCategoryData = { name: newCategoryName };

    dispatch(createProductCategory(newCategoryData)).then(() => {
      setNewCategoryName('');
      closeNewCategoryModal();
      toast.success('La nouvelle catégorie a été créée avec succès.');
      setTimeout(() => {
        window.location.reload(); // Rechargement de la page
      }, 3000);
    });
  };

  if (isLoading || !productCategories.data) {
    return <Spinner />;
  }

  return (
    <>
      <section className="headings">
        <h1>Liste des catégories de produits</h1>
        <button onClick={openNewCategoryModal} className="btn btn-sm">
        Créer une nouvelle catégorie
      </button>
      </section>
      <section>
        <div className="ticket-headings">
          <p>Référence</p>
          <p>Date de création</p>
          <p>Dernière modification</p>

          <p>Actions</p>
        </div>
        {productCategories.data.map((productCategory) => (
          <Ticket key={productCategory.id}>
            <div>{productCategory.name}</div>
            <div>{new Date(productCategory.createdAt).toLocaleDateString()}</div>
            <div>{new Date(productCategory.updatedAt).toLocaleDateString()}</div>

            <Link
              to={`/private/details-produit/${productCategory.id}`}
              className="btn btn-sm"
            >
              Catégorie détails
            </Link>
          </Ticket>
        ))}
      </section>

      <Modal
        titleModal="Créer une nouvelle catégorie de produit"
        btnTxt="Créer"
        isOpen={isNewCategoryModalOpen}
        onClose={closeNewCategoryModal}
      >
        <form>
          <div className='form-group'>
            <label>Nom:</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
        </form>

        <button onClick={handleNewCategorySubmit} className="btn btn-block">
          Créer
        </button>
      </Modal>

    
    </>
  );
}

export default PrivateProductCategoriesList;
