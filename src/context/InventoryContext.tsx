import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, InventoryAction } from '../types';
import { sampleProducts } from '../data/sampleData';

// Context type
type InventoryContextType = {
  products: Product[];
  dispatch: React.Dispatch<InventoryAction>;
  getProduct: (id: string) => Product | undefined;
  getLowStockProducts: () => Product[];
};

// Create context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Reducer function
function inventoryReducer(state: Product[], action: InventoryAction): Product[] {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'UPDATE_PRODUCT':
      return state.map(product => 
        product.id === action.payload.id ? action.payload : product
      );
    case 'REMOVE_PRODUCT':
      return state.filter(product => product.id !== action.payload);
    case 'UPDATE_STOCK':
      return state.map(product => 
        product.id === action.payload.id 
          ? { ...product, stock: product.stock - action.payload.quantity } 
          : product
      );
    default:
      return state;
  }
}

// Provider component
export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, dispatch] = useReducer(inventoryReducer, sampleProducts);

  // Get a product by ID
  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Get products with low stock (less than 20)
  const getLowStockProducts = () => {
    return products.filter(product => product.stock < 20);
  };

  return (
    <InventoryContext.Provider value={{ products, dispatch, getProduct, getLowStockProducts }}>
      {children}
    </InventoryContext.Provider>
  );
}

// Custom hook to use the inventory context
export function useInventory() {
  const context = useContext(InventoryContext);
  
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  
  return context;
}