import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set mock data for development
      setDashboardData({
        todaySales: 2450.75,
        totalSales: 15680.25,
        lowStockItems: 8,
        totalProducts: 156,
        totalCustomers: 89,
        recentSales: [
          { id: 1, amount: 45.50, customer: 'John Doe', time: '2 minutes ago' },
          { id: 2, amount: 128.75, customer: 'Jane Smith', time: '15 minutes ago' },
          { id: 3, amount: 89.25, customer: 'Mike Johnson', time: '1 hour ago' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBasedGreeting = () => {
    const greetings = {
      admin: 'System Overview',
      manager: 'Store Management',
      cashier: 'Sales Terminal',
      inventory_staff: 'Inventory Overview',
      viewer: 'Reports Dashboard'
    };
    return greetings[user?.role] || 'Dashboard';
  };

  const getQuickActions = () => {
    const actions = {
      admin: [
        { name: 'New Sale', href: '/sales', icon: '💰', color: 'bg-primary' },
        { name: 'Add Product', href: '/products', icon: '📦', color: 'bg-accent' },
        { name: 'View Reports', href: '/reports', icon: '📊', color: 'bg-highlight' },
        { name: 'Settings', href: '/settings', icon: '⚙️', color: 'bg-neutral' }
      ],
      manager: [
        { name: 'New Sale', href: '/sales', icon: '💰', color: 'bg-primary' },
        { name: 'Add Product', href: '/products', icon: '📦', color: 'bg-accent' },
        { name: 'Check Inventory', href: '/inventory', icon: '📋', color: 'bg-highlight' },
        { name: 'View Reports', href: '/reports', icon: '📊', color: 'bg-neutral' }
      ],
      cashier: [
        { name: 'New Sale', href: '/sales', icon: '💰', color: 'bg-primary' },
        { name: 'View Products', href: '/products', icon: '📦', color: 'bg-accent' }
      ],
      inventory_staff: [
        { name: 'Check Stock', href: '/inventory', icon: '📋', color: 'bg-primary' },
        { name: 'Low Stock Alert', href: '/inventory?filter=low', icon: '⚠️', color: 'bg-highlight' }
      ],
      viewer: [
        { name: 'Sales Report', href: '/reports', icon: '📊', color: 'bg-primary' },
        { name: 'Analytics', href: '/reports?tab=analytics', icon: '📈', color: 'bg-accent' }
      ]
    };
    return actions[user?.role] || [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">{getRoleBasedGreeting()}</h1>
          <p className="text-neutral mt-1">
            Welcome back, {user?.first_name}! Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-neutral">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {getQuickActions().map((action, index) => (
          <a
            key={index}
            href={action.href}
            className={`${action.color} rounded-lg p-4 text-white mobile-tap hover:opacity-90 transition-opacity`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm font-medium">{action.name}</div>
          </a>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Sales */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Today's Sales</p>
              <p className="text-2xl font-bold text-dark">
                ₦{dashboardData?.todaySales?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Sales */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Total Sales</p>
              <p className="text-2xl font-bold text-dark">
                ₦{dashboardData?.totalSales?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        {['admin', 'manager', 'inventory_staff'].includes(user?.role) && (
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral">Low Stock Items</p>
                <p className="text-2xl font-bold text-highlight">
                  {dashboardData?.lowStockItems || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-highlight/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Total Products */}
        {['admin', 'manager'].includes(user?.role) && (
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral">Total Products</p>
                <p className="text-2xl font-bold text-dark">
                  {dashboardData?.totalProducts || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-neutral/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        {['admin', 'manager', 'cashier'].includes(user?.role) && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Recent Sales</h3>
              <a href="/sales" className="text-primary text-sm font-medium hover:text-primary/80">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {dashboardData?.recentSales?.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-dark">₦{sale.amount}</p>
                    <p className="text-sm text-neutral">{sale.customer}</p>
                  </div>
                  <p className="text-xs text-neutral">{sale.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Stock Alert */}
        {['admin', 'manager', 'inventory_staff'].includes(user?.role) && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Stock Alerts</h3>
              <a href="/inventory?filter=low" className="text-highlight text-sm font-medium hover:text-highlight/80">
                View all
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-highlight/10 rounded-lg">
                <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-dark">{dashboardData?.lowStockItems || 0} items need restocking</p>
                  <p className="text-sm text-neutral">Check inventory for details</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
