import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Header from './components/Header'

import ScrollToTop from './components/ScrollToTop.'
import './index.css'
import Login from './pages/Login'
import Private from './pages/private/Private'
import Documentation from './pages/Documentation'
import PrivateHome from './pages/private/privateHome/PrivateHome'
import PrivateUsers from './pages/private/PrivateUserList/PrivateUsers'
import PrivateUserDetails from './pages/private/privateUserDetails/PrivateUserDetails'

import PrivateProductList from './pages/private/privateProductList/PrivateProductList'
import PrivateMessagesList from './pages/private/privateMessagesList/PrivateMessagesList'
import PrivateProductCategoriesList from './pages/private/privateProductCategoriesList/PrivateProductCategoriesList'
import PrivateServicesList from './pages/private/privateServicesList/PrivateServicesList'
import PrivateCollectPointsList from './pages/private/privateCollectPointsList/PrivateCollectPointsList'
import PrivateWasteList from './pages/private/privateWasteList/PrivateWasteList'
import PrivateCertificatsList from './pages/private/privateCertificatsList/PrivateCertificatsList'
import PrivateWasteDetails from './pages/private/privateWasteDetails/PrivateWasteDetails'
import PrivateMessageDetails from './pages/private/privateMessageDetails/PrivateMessageDetails'
import PrivateCollectPointDetails from './pages/private/privateCollectPointDetails/PrivateCollectPointDetails'
import PrivateCertificatDetails from './pages/private/privateCertificatDetails/PrivateCertificatDetails'
import PrivateProductCategoryDetails from './pages/private/privateProductCategoryDetails/PrivateProductCategoryDetails'
import PrivateArchivedMessagesList from './pages/private/privateArchivedMessagesList/PrivateArchivedMessagesList'
import PrivateProductDetail from './pages/private/privateProductDetail/PrivateProductDetail'
import PrivateServiceDetail from './pages/private/privateServiceDetails/PrivateServiceDetails'
import PrivateRecyclableProductsList from './pages/private/privateRecyclableProductsList/PrivateRecyclableProductsList'
import PrivateRecyclableProductCategoriesList from './pages/private/privateRecyclableProductCategoriesList/PrivateRecyclableProductCategoriesList'
import PrivateVoluntaryDropPointsList from './pages/private/privateVoluntaryDropPointsList/PrivateVoluntaryDropPointsList'
import PrivateGarbageTypeList from './pages/private/privateGarbageTypeList/PrivateGarbageTypeList'
import PrivatePlasticTypesList from './pages/private/privatePlasticTypesList/PrivatePlasticTypesList'
import PrivateNutriScoreCalculator from './pages/private/privateNutriScoreCalculator/PrivateNutriScoreCalculator'
import PrivatePlasticTypeDetails from './pages/private/privatePlasticTypeDetails/PrivatePlasticTypeDetails'
import PrivateRecyclableProductCategoryDetails from './pages/private/privateRecyclableProductCategoryDetails/PrivateRecyclableProductCategoryDetails'
import PrivateVoluntaryDropPointDetails from './pages/private/privateVoluntaryDropPointDetails/PrivateVoluntaryDropPointDetails'
import PrivateRecyclableProductDetails from './pages/private/privateRecyclableProductDetails/PrivateRecyclableProductDetails.jsx'

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/private" element={<Private />}>
              <Route path="/private/home" element={<PrivateHome />} />
              <Route
                path="/private/gestion-utilisateurs"
                element={<PrivateUsers />}
              />
              <Route
                path="/private/details-utilisateur/:id"
                element={<PrivateUserDetails />}
              />

              <Route
                path="/private/liste-categorie-produits"
                element={<PrivateProductCategoriesList />}
              />
              <Route
                path="/private/liste-produits"
                element={<PrivateProductList />}
              />
              <Route
                path="/private/liste-produits-recyclable"
                element={<PrivateRecyclableProductsList />}
              />
              <Route
                path="/private/liste-categories-produit-recyclable"
                element={<PrivateRecyclableProductCategoriesList />}
              />
              <Route
                path="/private/produit-recyclable-categorie-details/:id"
                element={<PrivateRecyclableProductCategoryDetails />}
              />
              <Route
                path="/private/produit-recyclable-details/:id"
                element={<PrivateRecyclableProductDetails />}
              />
              <Route
                path="/private/liste-types-ordures"
                element={<PrivateGarbageTypeList />}
              />
              <Route
                path="/private/liste-types-plastique"
                element={<PrivatePlasticTypesList />}
              />
              <Route
                path="/private/details-type-de-plastique/:id"
                element={<PrivatePlasticTypeDetails />}
              />
              <Route
                path="/private/details-produit/:id"
                element={<PrivateProductDetail />}
              />
              <Route
                path="/private/details-services/:id"
                element={<PrivateServiceDetail />}
              />
              <Route
                path="/private/liste-services"
                element={<PrivateServicesList />}
              />

              <Route
                path="/private/liste-messages"
                element={<PrivateMessagesList />}
              />
              <Route
                path="/private/liste-points-de-collectes"
                element={<PrivateCollectPointsList />}
              />
              <Route
                path="/private/liste-types-dechets"
                element={<PrivateWasteList />}
              />
              <Route
                path="/private/waste-details/:id"
                element={<PrivateWasteDetails />}
              />
              <Route
                path="/private/message-details/:id"
                element={<PrivateMessageDetails />}
              />
              <Route
                path="/private/categorie-produit-details/:id"
                element={<PrivateProductCategoryDetails />}
              />
              <Route
                path="/private/message-archivees"
                element={<PrivateArchivedMessagesList />}
              />
              <Route
                path="/private/certificat-details/:id"
                element={<PrivateCertificatDetails />}
              />
              <Route
                path="/private/details-point-de-collecte/:id"
                element={<PrivateCollectPointDetails />}
              />
              <Route
                path="/private/liste-certificats"
                element={<PrivateCertificatsList />}
              />
              <Route
                path="/private/liste-points-apport-volontaires"
                element={<PrivateVoluntaryDropPointsList />}
              />
              <Route
                path="/private/points-apport-volontaires-details/:id"
                element={<PrivateVoluntaryDropPointDetails />}
              />
              <Route
                path="/private/calculateur-nutri-score"
                element={<PrivateNutriScoreCalculator />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
