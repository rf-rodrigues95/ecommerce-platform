import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';

import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/products/:productId" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function Layout() {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />} {/* Show only if logged in */}
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
