import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Cart from './pages/Cart';
import Bills from './pages/Bills';
import { InventoryProvider } from './context/InventoryContext';
import { CartProvider } from './context/CartContext';
import { BillProvider } from './context/BillContext';

function App() {
  return (
    <BrowserRouter>
      <InventoryProvider>
        <CartProvider>
          <BillProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="cart" element={<Cart />} />
                <Route path="bills" element={<Bills />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BillProvider>
        </CartProvider>
      </InventoryProvider>
    </BrowserRouter>
  );
}

export default App;