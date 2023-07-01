import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getRecyclableProducts,
  createRecyclableProduct,
} from '../../../features/recyclableProduct/recyclableProductSlice';
import { getPlasticTypes } from '../../../features/plasticType/plasticTypeSlice';
import Spinner from '../../../components/shared/spinner/Spinner';
import { BackButton } from '../../../components/shared/BackButton';
import Ticket from '../../../components/shared/ticket/Ticket';
import { Link } from 'react-router-dom';
import Modal from '../../../components/shared/modal/Modal';
import { getRecyclableProductCategories } from '../../../features/recyclableProductCategory/recyclableProductCategorySlice';

function PrivateRecyclableProductsList() {
  const dispatch = useDispatch();
  const { recyclableProducts } = useSelector((state) => state.recyclableProduct);
  const { plasticTypes } = useSelector((state) => state.plasticType);
  const { recyclableProductCategories } = useSelector(
    (state) => state.recyclableProductCategory
  );

  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    recyclableProductCategory: '',
    codeBarre: '',
    photo: 'no-photo.png',
    marque: '',
    designation: '',
    remarque: '',
    recyclableByKrysto: true,
    recyclabilityScore: 2,
    plasticTypes: [],
    nutriScore: '',
    recyclingStatus: 'Enfoui ou incinéré',
    containsPalmOil: false,
  });
  const openNewProductModal = () => {
    setIsNewProductModalOpen(true);
  };

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false);
  };

  const handleNewProductChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === 'checkbox') {
      setNewProductData({
        ...newProductData,
        [name]: checked,
      });
    } else if (type === 'select-multiple') {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setNewProductData({
        ...newProductData,
        [name]: selectedOptions,
      });
    } else {
      setNewProductData({
        ...newProductData,
        [name]: value,
      });
    }
  };

  const handleNewProductSubmit = (e) => {
    e.preventDefault();

    dispatch(createRecyclableProduct(newProductData))
      .then(() => {
        toast.success('Le nouveau produit recyclable a été créé avec succès.');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error("Une erreur s'est produite lors de la création du produit recyclable.");
      });
    closeNewProductModal();
  };

  useEffect(() => {
    dispatch(getRecyclableProducts());
    dispatch(getPlasticTypes());
    dispatch(getRecyclableProductCategories());
  }, [dispatch]);

  if (
    !recyclableProducts.data ||
    !plasticTypes.data ||
    !recyclableProductCategories.data
  ) {
    return <Spinner />;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />

        <h1>Liste des catégories de produits recyclables</h1>
        <button onClick={openNewProductModal} className="btn">
          Créer un nouveau produit
        </button>
      </section>
      <section>
        <div className="ticket-headings">
          <p>Date de création</p>
          <p>Marque</p>
          <p>Désignation</p>
          <p>Actions</p>
        </div>
        {recyclableProducts.data.map((recyclableProduct) => (
          <Ticket key={recyclableProduct._id}>
            <div>{recyclableProduct.recyclableProductCategory}</div>
            <div>{recyclableProduct.marque}</div>
            <div>{recyclableProduct.designation}</div>

            <Link
              to={`/private/produit-recyclable-details/${recyclableProduct._id}`}
              className="btn btn-sm"
            >
              Détail du produit
            </Link>
          </Ticket>
        ))}
      </section>
      <Modal
        titleModal="Créer un nouveau produit"
        btnTxt="Créer"
        isOpen={isNewProductModalOpen}
        onClose={closeNewProductModal}
      >
        {/* Formulaire de création du nouveau produit */}
        <form onSubmit={handleNewProductSubmit}>
          <div className="form-group">
            <label htmlFor="recyclableProductCategory">
              Catégorie de produit recyclable
            </label>
            <select
              name="recyclableProductCategory"
              id="recyclableProductCategory"
              value={newProductData.recyclableProductCategory}
              onChange={handleNewProductChange}
            >
              <option value="">Sélectionnez une catégorie</option>
              {recyclableProductCategories.data.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="codeBarre">Code Barre</label>
            <input
              type="text"
              name="codeBarre"
              id="codeBarre"
              value={newProductData.codeBarre}
              onChange={handleNewProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="marque">Marque</label>
            <input
              type="text"
              name="marque"
              id="marque"
              value={newProductData.marque}
              onChange={handleNewProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Désignation</label>
            <input
              type="text"
              name="designation"
              id="designation"
              value={newProductData.designation}
              onChange={handleNewProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="remarque">Remarque</label>
            <input
              type="text"
              name="remarque"
              id="remarque"
              value={newProductData.remarque}
              onChange={handleNewProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recyclableByKrysto">Recyclable par Krysto</label>
            <input
              type="checkbox"
              name="recyclableByKrysto"
              id="recyclableByKrysto"
              checked={newProductData.recyclableByKrysto}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  recyclableByKrysto: e.target.checked,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="recyclabilityScore">Score de recyclabilité</label>
            <input
              type="number"
              name="recyclabilityScore"
              id="recyclabilityScore"
              value={newProductData.recyclabilityScore}
              onChange={handleNewProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="plasticTypes">Types de plastique</label>
            <select
              name="plasticTypes"
              id="plasticTypes"
              multiple
              value={newProductData.plasticTypes}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setNewProductData({
                  ...newProductData,
                  plasticTypes: selectedOptions,
                });
              }}
            >
              {plasticTypes.data.map((plasticType) => (
                <option key={plasticType._id} value={plasticType._id}>
                  {plasticType.sigleFr}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nutriScore">Nutri-Score</label>
            <select
              name="nutriScore"
              id="nutriScore"
              value={newProductData.nutriScore}
              onChange={handleNewProductChange}
            >
              <option value="">Sélectionnez un score</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="recyclingStatus">Statut de recyclage</label>
            <select
              name="recyclingStatus"
              id="recyclingStatus"
              value={newProductData.recyclingStatus}
              onChange={handleNewProductChange}
            >
              <option value="Recyclé en Nouvelle-Calédonie">
                Recyclé en Nouvelle-Calédonie
              </option>
              <option value="Revalorisé à l'export">
                Revalorisé à l'export
              </option>
              <option value="Enfoui ou incinéré">Enfoui ou incinéré</option>
            </select>
          </div>
          <div className="form-group">
            
            <label htmlFor="containsPalmOil">
              Contient de l'huile de palme
            </label>
            <input
              type="checkbox"
              name="containsPalmOil"
              id="containsPalmOil"
              checked={newProductData.containsPalmOil}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  containsPalmOil: e.target.checked,
                })
              }
            />
          </div>
          <div className="form-group">

          <button className='btn btn-block btn-danger' type="submit">Créer</button>
          </div>
        </form>
      </Modal>
      <ToastContainer /> {/* Conteneur pour afficher les toasts */}
    </>
  )
}

export default PrivateRecyclableProductsList
