import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Sales from './pages/Sales/Sales';
import Inventory from './pages/Inventory/Inventory';
import Customers from './pages/Customers/Customers';
import Orders from './pages/Orders/Orders';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Products - Admin, Manager only */}
        <Route path="/products" element={<Products />} />
        
        {/* Sales - Admin, Manager, Cashier */}
        {['admin', 'manager', 'cashier'].includes(user.role) && (
          <Route path="/sales" element={<Sales />} />
        )}
        
        {/* Inventory - Admin, Manager, Inventory Staff */}
        {['admin', 'manager', 'inventory_staff'].includes(user.role) && (
          <Route path="/inventory" element={<Inventory />} />
        )}
        
        {/* Customers - Admin, Manager */}
        {['admin', 'manager'].includes(user.role) && (
          <Route path="/customers" element={<Customers />} />
        )}
        
        {/* Orders - Admin, Manager, Cashier */}
        {['admin', 'manager', 'cashier'].includes(user.role) && (
          <Route path="/orders" element={<Orders />} />
        )}
        
        {/* Reports - Admin, Manager, Viewer */}
        {['admin', 'manager', 'viewer'].includes(user.role) && (
          <Route path="/reports" element={<Reports />} />
        )}
        
        {/* Settings - Admin only */}
        {user.role === 'admin' && (
          <Route path="/settings" element={<Settings />} />
        )}
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
