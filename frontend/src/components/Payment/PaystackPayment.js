import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const PaystackPayment = ({ amount, customerEmail, saleId, onSuccess, onClose }) => {
  const { api } = useAuth();
  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    try {
      setLoading(true);
      
      const response = await api.post('/payments/initialize', {
        amount: amount,
        email: customerEmail,
        sale_id: saleId
      });

      const { authorization_url, reference } = response.data;

      // Open Paystack popup
      const popup = window.open(
        authorization_url,
        'paystack-payment',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      // Poll for payment completion
      const pollForCompletion = setInterval(async () => {
        if (popup.closed) {
          clearInterval(pollForCompletion);
          await verifyPayment(reference);
        }
      }, 1000);

    } catch (error) {
      toast.error('Failed to initialize payment');
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await api.get(`/payments/verify?reference=${reference}`);
      
      if (response.data.status === 'success') {
        toast.success('Payment completed successfully!');
        onSuccess(response.data);
      } else {
        toast.error('Payment verification failed');
      }
    } catch (error) {
      toast.error('Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Complete Payment
          </h3>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Amount to pay:</p>
            <p className="text-2xl font-bold text-primary">
              ₦{amount.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={initializePayment}
              disabled={loading}
              className="flex-1 btn btn-primary"
            >
              {loading ? 'Processing...' : 'Pay with Paystack'}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Secure payment powered by Paystack
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;
