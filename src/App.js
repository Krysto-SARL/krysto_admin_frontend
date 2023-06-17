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
