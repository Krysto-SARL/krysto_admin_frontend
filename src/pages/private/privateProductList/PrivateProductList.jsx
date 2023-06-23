import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/shared/spinner/Spinner'
import {
  getProducts,
  createProduct,
} from '../../../features/product/productSlice'
import { Link } from 'react-router-dom'
import Modal from '../../../components/shared/modal/Modal'
import { getProductCategories } from '../../../features/productCategory/productCategorySlice'
import { toast } from 'react-toastify'
import Ticket from '../../../components/shared/ticket/Ticket'
import { BackButton } from '../../../components/shared/BackButton'

function PrivateProductList() {
  const { products} = useSelector((state) => state.product)
  const { productCategories } = useSelector((state) => state.productCategory)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getProductCategories())
  }, [dispatch])

  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const [newProductData, setNewProductData] = useState({
    reference: '',
    designation: '',
    size: '',
    unitWeight: '',
    unitPrice: 0,
    categoryId: '', // Nouvel état pour la catégorie de produit sélectionnée
  })

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true)
  }

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false)
  }

  const handleNewProductSubmit = () => {
    const { reference, categoryId } = newProductData

    if (!reference || !categoryId) {
      // Affichez un message d'erreur ou effectuez une action appropriée lorsque la référence ou la catégorie est manquante
      return
    }

    dispatch(createProduct(newProductData, categoryId)).then(() => {
      setNewProductData({
        reference: '',
        designation: '',
        size: '',
        unitWeight: '',
        unitPrice: 0,
        categoryId: '', // Réinitialiser également la catégorie sélectionnée
      })
      closeNewProductModal()

      // Afficher un toast indiquant que le produit a été ajouté avec succès
      toast.success('Le produit a été ajouté avec succès')

      // Recharger la page après 2 secondes
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
  }

  if (!products.data || !productCategories.data) {
    return <Spinner />
  }

  

  return (
    <>
      <section className="headings">
      <BackButton url={'/private/home'} />
        <h1>Gestion des produits</h1>

        <button onClick={openNewProductModal} className="btn ">
          Créer un nouveau produit
        </button>
      </section>

      <section>
        <div className="ticket-headings">
          <p>Référence</p>
          <p>Date de création</p>
          <p>Désignation</p>
          <p>Actions</p>
        </div>
        {products.data.map((product) => (
            <Ticket key={product.id}>

        
            <div>{product.reference}</div>
            <div>{new Date(product.createdAt).toLocaleDateString()}</div>
            <div>{product.designation}</div>
            <Link
              to={`/private/details-produit/${product.id}`}
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
        <form>
          <div className="form-group">
            <label>Référence:</label>
            <input
              type="text"
              value={newProductData.reference}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  reference: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Désignation:</label>
            <input
              type="text"
              value={newProductData.designation}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  designation: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Taille:</label>
            <input
              type="text"
              value={newProductData.size}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  size: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Poids unitaire:</label>
            <input
              type="text"
              value={newProductData.unitWeight}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  unitWeight: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Prix unitaire:</label>
            <input
              type="number"
              value={newProductData.unitPrice}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  unitPrice: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Catégorie:</label>
            <select
              value={newProductData.categoryId}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  categoryId: e.target.value,
                })
              }
            >
              <option value="">Sélectionner une catégorie</option>
              {productCategories.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="form-group">
          <button onClick={handleNewProductSubmit} className="btn btn-block">
            Créer
          </button>
        </div>
      </Modal>
    </>
  )
}

export default PrivateProductList
