import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, CartAction } from '../types';

// Context type
type CartContextType = {
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  getTotal: () => number;
  getItemCount: () => number;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        return state.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity } 
            : item
        );
      } else {
        // Add new item
        return [...state, action.payload];
      }
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.product.id !== action.payload);
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.product.id !== action.payload.id);
      }
      
      return state.map(item => 
        item.product.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  };

  // Get total number of items
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, dispatch, getTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}