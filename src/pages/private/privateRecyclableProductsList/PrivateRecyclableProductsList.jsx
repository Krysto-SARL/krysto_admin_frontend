import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  getRecyclableProducts,
  createRecyclableProduct,
} from '../../../features/recyclableProduct/recyclableProductSlice'
import { getPlasticTypes } from '../../../features/plasticType/plasticTypeSlice'
import { getGarbageTypes } from '../../../features/garbageType/garbageTypeSlice'
import { getNutriScores } from '../../../features/nutriScore/nutriScoreSlice'
import { getEcoScores } from '../../../features/ecoScore/ecoScoreSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import SearchBar from '../../../components/shared/searchBar/SearchBar'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import { Link } from 'react-router-dom'
import Modal from '../../../components/shared/modal/Modal'
import { getRecyclableProductCategories } from '../../../features/recyclableProductCategory/recyclableProductCategorySlice'

function PrivateRecyclableProductsList() {
  const dispatch = useDispatch()
  const { recyclableProducts } = useSelector((state) => state.recyclableProduct)
  const { plasticTypes } = useSelector((state) => state.plasticType)
  const { garbageTypes } = useSelector((state) => state.garbageType)
  const { nutriScores } = useSelector((state) => state.nutriScore)
  const { ecoScores } = useSelector((state) => state.ecoScore)

  const { recyclableProductCategories } = useSelector(
    (state) => state.recyclableProductCategory,
  )

  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const [newProductData, setNewProductData] = useState({
    recyclableProductCategory: '',
    codeBarre: '',
    photo: 'no-photo.png',
    marque: '',
    designation: '',
    remarque: '',
    environementReglementation: '',
    recyclableByKrysto: true,
    ecoScores: '',
    nutriScore: '',
    plasticTypes: [],
    garbageTypes: [],
    transportation: 'Importée',
    containsPalmOil: false,
  })
  const openNewProductModal = () => {
    setIsNewProductModalOpen(true)
  }

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false)
  }

  const handleNewProductChange = (e) => {
    const { name, value, type, checked, options } = e.target

    if (type === 'checkbox') {
      setNewProductData({
        ...newProductData,
        [name]: checked,
      })
    } else if (type === 'select-multiple') {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value)

      setNewProductData({
        ...newProductData,
        [name]: selectedOptions,
      })
    } else {
      setNewProductData({
        ...newProductData,
        [name]: value,
      })
    }
  }

  const handleNewProductSubmit = (e) => {
    e.preventDefault()

    dispatch(createRecyclableProduct(newProductData))
      .then(() => {
        toast.success('Le nouveau produit recyclable a été créé avec succès.')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création du produit recyclable.",
        )
      })
    closeNewProductModal()
  }

  useEffect(() => {
    dispatch(getRecyclableProducts())
    dispatch(getPlasticTypes())
    dispatch(getRecyclableProductCategories())
    dispatch(getGarbageTypes())
    dispatch(getEcoScores())
    dispatch(getNutriScores())
  }, [dispatch])


  if (
    !recyclableProducts.data ||
    !plasticTypes.data ||
    !recyclableProductCategories.data ||
    !garbageTypes.data ||
    !nutriScores.data ||
    !ecoScores.data
  ) {
    return <Spinner />
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />

        <h1>Liste des catégories de produits recyclables</h1>
        <button onClick={openNewProductModal} className="btn">
          Créer un nouveau produit
        </button>
        <SearchBar/>
      </section>
      <section>
        <div className="ticket-headings">
          <p>image</p>
          <p>Marque</p>
          <p>Désignation</p>
          <p>Actions</p>
        </div>
        {recyclableProducts.data.map((recyclableProduct) => (
          <Ticket key={recyclableProduct._id}>
            <div>
              {' '}
              <img
                className="recycle-product-image"
                src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${recyclableProduct.photo}`}
                alt=""
              />
            </div>
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
            <label htmlFor="environementReglementation">Environement & reglementation</label>
            <input
              type="text"
              name="environementReglementation"
              id="environementReglementation"
              value={newProductData.environementReglementation}
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
            <label htmlFor="ecoScore">Eco-Score</label>
            <select
              name="ecoScore"
              id="ecocore"
              value={newProductData.ecoScore}
              onChange={handleNewProductChange}
            >
              <option value="">Sélectionnez un score</option>
              {ecoScores.data.map((score) => (
                <option key={score._id} value={score._id}>
                  {score.score}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="garbageTypes">Types d'ordures</label>
            <select
              name="garbageTypes"
              id="garbageTypes"
              multiple
              value={newProductData.garbageTypes}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                )
                setNewProductData((prevData) => ({
                  ...prevData,
                  garbageTypes: selectedOptions,
                }))
              }}
            >
              {garbageTypes.data.map((garbage) => (
                <option key={garbage._id} value={garbage._id}>
                  {garbage.name}
                </option>
              ))}
            </select>
            <div>
              <p>Types d'ordures selectione :</p>
              <ul>
                {newProductData.garbageTypes.map((garbageTypeId) => (
                  <li key={garbageTypeId}>
                    {
                      garbageTypes.data.find(
                        (garbage) => garbage._id === garbageTypeId,
                      ).name
                    }
                  </li>
                ))}
              </ul>
            </div>
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
                  (option) => option.value,
                )
                setNewProductData((prevData) => ({
                  ...prevData,
                  plasticTypes: selectedOptions,
                }))
              }}
            >
              {plasticTypes.data.map((plasticType) => (
                <option key={plasticType._id} value={plasticType._id}>
                  {plasticType.sigleFr}
                </option>
              ))}
            </select>
            <div>
              <p>Types de plastique sélectionnés :</p>
              <ul>
                {newProductData.plasticTypes.map((plasticTypeId) => (
                  <li key={plasticTypeId}>
                    {
                      plasticTypes.data.find(
                        (plasticType) => plasticType._id === plasticTypeId,
                      ).sigleFr
                    }
                  </li>
                ))}
              </ul>
            </div>
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

              {nutriScores.data.map((score) => (
                <option key={score._id} value={score._id}>
                  {score.score}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transportation">transport</label>
            <select
              name="transportation"
              id="transportation"
              value={newProductData.transportation}
              onChange={handleNewProductChange}
            >
              <option value="Fabriquée en Nouvelle-Calédonie">
                Fabriquée en Nouvelle-Calédonie
              </option>
              <option value="Transformée en Nouvelle-Calédonie">
                Transformée en Nouvelle-Calédonie
              </option>
              <option value="Importée">Importée</option>
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
            <button className="btn btn-block btn-danger" type="submit">
              Créer
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer /> 
    </>
  )
}

export default PrivateRecyclableProductsList
