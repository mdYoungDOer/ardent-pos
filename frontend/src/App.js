import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import PublicLayout from './components/Layout/PublicLayout';

// Public pages
import LandingPage from './pages/Landing/LandingPage';
import AboutPage from './pages/About/AboutPage';
import FeaturesPage from './pages/Features/FeaturesPage';
import PricingPage from './pages/Pricing/PricingPage';
import FAQPage from './pages/FAQ/FAQPage';
import ContactPage from './pages/Contact/ContactPage';

// Authentication pages
import { AuthProvider } from './contexts/SimpleAuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Protected app pages
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Sales from './pages/Sales/Sales';
import Inventory from './pages/Inventory/Inventory';
import Customers from './pages/Customers/Customers';
import Orders from './pages/Orders/Orders';
import Payments from './pages/Payments/Payments';
import Settings from './pages/Settings/Settings';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes with shared layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Auth routes without shared layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected app routes */}
        <Route path="/app" element={<ProtectedRoute><Navigate to="/app/dashboard" replace /></ProtectedRoute>} />
        <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/app/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/app/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/app/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/app/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/app/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/app/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
