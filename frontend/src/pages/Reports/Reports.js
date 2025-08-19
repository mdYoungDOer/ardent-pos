import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Reports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [activeTab, dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      // Mock data for development since we haven't implemented the reports API yet
      setReportData({
        sales: {
          totalSales: 15680.25,
          totalOrders: 234,
          averageOrderValue: 67.01,
          topProducts: [
            { name: 'iPhone 14 Pro', quantity: 12, revenue: 11999.88 },
            { name: 'Samsung Galaxy S23', quantity: 8, revenue: 7199.92 },
            { name: 'Nike Air Max 90', quantity: 15, revenue: 1949.85 }
          ],
          dailySales: [
            { date: '2024-01-15', amount: 1250.75 },
            { date: '2024-01-16', amount: 890.50 },
            { date: '2024-01-17', amount: 1450.25 },
            { date: '2024-01-18', amount: 2100.00 }
          ]
        },
        inventory: {
          totalProducts: 156,
          lowStockItems: 8,
          outOfStockItems: 2,
          totalValue: 45680.75
        },
        customers: {
          totalCustomers: 89,
          newCustomers: 12,
          returningCustomers: 45,
          topCustomers: [
            { name: 'Jane Smith', orders: 12, spent: 2840.50 },
            { name: 'John Doe', orders: 8, spent: 1950.75 },
            { name: 'Mike Johnson', orders: 6, spent: 1450.25 }
          ]
        }
      });
    } catch (error) {
      toast.error('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    toast.info('Export functionality will be implemented soon');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Reports & Analytics</h1>
          <p className="text-neutral mt-1">Track your business performance and insights</p>
        </div>
        
        <button
          onClick={exportReport}
          className="btn-outline mt-4 sm:mt-0 mobile-tap"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Export Report
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 sm:mt-6">
            <button 
              onClick={() => setDateRange({
                from: new Date().toISOString().split('T')[0],
                to: new Date().toISOString().split('T')[0]
              })}
              className="btn-outline text-sm px-3 py-1"
            >
              Today
            </button>
            <button 
              onClick={() => {
                const today = new Date();
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                setDateRange({
                  from: weekAgo.toISOString().split('T')[0],
                  to: today.toISOString().split('T')[0]
                });
              }}
              className="btn-outline text-sm px-3 py-1"
            >
              Last 7 Days
            </button>
            <button 
              onClick={() => {
                const today = new Date();
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                setDateRange({
                  from: monthAgo.toISOString().split('T')[0],
                  to: today.toISOString().split('T')[0]
                });
              }}
              className="btn-outline text-sm px-3 py-1"
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sales'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sales Report
          </button>
          {user.role !== 'viewer' && (
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'inventory'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Inventory Report
            </button>
          )}
          {(user.role === 'admin' || user.role === 'manager') && (
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'customers'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Customer Report
            </button>
          )}
        </div>
      </div>

      {/* Report Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {activeTab === 'sales' && (
            <SalesReport data={reportData?.sales} />
          )}
          {activeTab === 'inventory' && (
            <InventoryReport data={reportData?.inventory} />
          )}
          {activeTab === 'customers' && (
            <CustomerReport data={reportData?.customers} />
          )}
        </>
      )}
    </div>
  );
};

const SalesReport = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Sales Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Total Sales</p>
              <p className="text-2xl font-bold text-dark">₦{data.totalSales.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Total Orders</p>
              <p className="text-2xl font-bold text-dark">{data.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Avg Order Value</p>
              <p className="text-2xl font-bold text-dark">₦{data.averageOrderValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-highlight/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <h3 className="text-lg font-semibold text-dark mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {data.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-dark">{product.name}</p>
                <p className="text-sm text-neutral">Quantity sold: {product.quantity}</p>
              </div>
              <p className="font-bold text-primary">₦{product.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InventoryReport = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Inventory Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-dark">{data.totalProducts}</p>
            <p className="text-sm text-neutral">Total Products</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{data.lowStockItems}</p>
            <p className="text-sm text-neutral">Low Stock</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{data.outOfStockItems}</p>
            <p className="text-sm text-neutral">Out of Stock</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">₦{data.totalValue.toLocaleString()}</p>
            <p className="text-sm text-neutral">Total Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerReport = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Customer Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-dark">{data.totalCustomers}</p>
            <p className="text-sm text-neutral">Total Customers</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{data.newCustomers}</p>
            <p className="text-sm text-neutral">New Customers</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{data.returningCustomers}</p>
            <p className="text-sm text-neutral">Returning Customers</p>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="card">
        <h3 className="text-lg font-semibold text-dark mb-4">Top Customers</h3>
        <div className="space-y-3">
          {data.topCustomers.map((customer, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-dark">{customer.name}</p>
                <p className="text-sm text-neutral">{customer.orders} orders</p>
              </div>
              <p className="font-bold text-primary">₦{customer.spent.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
