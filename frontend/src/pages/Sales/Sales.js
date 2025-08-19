import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Sales = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pos');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data.data.products || []);
    } catch (error) {
      toast.error('Failed to fetch products');
      // Mock data for development
      setProducts([
        {
          id: '1',
          name: 'iPhone 14 Pro',
          price: 999.99,
          sku: 'IPH14PRO128',
          quantity: 50
        },
        {
          id: '2',
          name: 'Samsung Galaxy S23',
          price: 899.99,
          sku: 'SGS23256',
          quantity: 30
        },
        {
          id: '3',
          name: 'Nike Air Max 90',
          price: 129.99,
          sku: 'NAM90WHT42',
          quantity: 25
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product_id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.quantity) {
        toast.error('Insufficient stock');
        return;
      }
      setCart(cart.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        product_id: product.id,
        name: product.name,
        unit_price: product.price,
        quantity: 1,
        line_total: product.price
      }]);
    }
    
    toast.success(`${product.name} added to cart`);
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.product_id === productId
        ? { ...item, quantity, line_total: item.unit_price * quantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.line_total, 0);
    const taxRate = 0.075; // 7.5% tax
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
    
    return { subtotal, taxAmount, total };
  };

  const processSale = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    try {
      setProcessing(true);
      const { subtotal, taxAmount, total } = getCartTotals();
      
      const saleData = {
        items: cart,
        subtotal,
        tax_amount: taxAmount,
        total_amount: total,
        payment_method: 'cash',
        payment_status: 'paid'
      };
      
      const response = await axios.post('/api/sales', saleData);
      
      toast.success('Sale completed successfully!');
      setCart([]);
      
      // Refresh products to update stock
      fetchProducts();
      
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to process sale';
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { subtotal, taxAmount, total } = getCartTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Sales Terminal</h1>
          <p className="text-neutral mt-1">Process sales and manage transactions</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="mt-4 sm:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('pos')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'pos'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Point of Sale
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sales History
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                  />
                </div>
                <button className="btn-outline px-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4m4 0h2m4 0h4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="card">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer mobile-tap"
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-dark truncate">{product.name}</h3>
                        <span className="text-xs text-neutral bg-gray-100 px-2 py-1 rounded">
                          Stock: {product.quantity || 0}
                        </span>
                      </div>
                      <p className="text-sm text-neutral mb-2">{product.sku}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ₦{product.price?.toLocaleString()}
                        </span>
                        <button className="btn-primary text-xs px-3 py-1">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart Section */}
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark">Cart</h3>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                  </svg>
                  <p className="text-neutral">Cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product_id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-dark truncate">{item.name}</h4>
                        <p className="text-sm text-neutral">₦{item.unit_price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartItem(item.product_id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 mobile-tap"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 mobile-tap"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 mobile-tap ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Totals */}
            {cart.length > 0 && (
              <div className="card">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral">Subtotal:</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral">Tax (7.5%):</span>
                    <span className="font-medium">₦{taxAmount.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={processSale}
                  disabled={processing}
                  className="btn-primary w-full mt-4 touch-target mobile-tap flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Complete Sale'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-dark mb-4">Sales History</h3>
          <p className="text-neutral">Sales history will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default Sales;
