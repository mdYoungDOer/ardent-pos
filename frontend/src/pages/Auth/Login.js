import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data);
    setIsLoading(false);
    
    if (result.success) {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-dark">Ardent POS</h1>
            <p className="text-neutral mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark mb-2">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                placeholder="Enter your username or email"
                {...register('username', { 
                  required: 'Username or email is required',
                  minLength: { value: 3, message: 'Minimum 3 characters required' }
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full touch-target mobile-tap flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-dark mb-2">Demo Credentials:</h3>
            <div className="text-sm text-neutral space-y-1">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p className="text-xs text-gray-500">
                Use these credentials to explore the system
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral">
              Forgot your password?{' '}
              <button className="text-primary hover:text-primary/80 font-medium">
                Reset it here
              </button>
            </p>
          </div>
        </div>

        {/* Mobile-specific footer */}
        <div className="mt-6 text-center text-xs text-neutral">
          <p>© 2024 Ardent POS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
