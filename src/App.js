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
import PrivateOrderList from './pages/private/privateOrderList/PrivateOrderList'
import PrivateOrderDetails from './pages/private/privateOrderDetails/PrivateOrderDetails'
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
                path="/private/order-liste"
                element={<PrivateOrderList />}
              />
              <Route
                path="/private/details-commande/:id"
                element={<PrivateOrderDetails />}
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
