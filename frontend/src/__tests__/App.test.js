import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import App from '../App';

// Mock the AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 1, name: 'Test User', role: 'admin' },
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
    api: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}));

// Mock components to avoid complex rendering
jest.mock('../pages/Dashboard/Dashboard', () => () => <div>Dashboard</div>);
jest.mock('../pages/Products/Products', () => () => <div>Products</div>);
jest.mock('../pages/Sales/Sales', () => () => <div>Sales</div>);
jest.mock('../pages/Inventory/Inventory', () => () => <div>Inventory</div>);
jest.mock('../pages/Customers/Customers', () => () => <div>Customers</div>);
jest.mock('../pages/Orders/Orders', () => () => <div>Orders</div>);
jest.mock('../pages/Reports/Reports', () => () => <div>Reports</div>);
jest.mock('../pages/Settings/Settings', () => () => <div>Settings</div>);

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders dashboard by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });
});
