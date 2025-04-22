import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Bill, BillAction, PaymentStatus } from '../types';
import { sampleBills } from '../data/sampleData';

// Context type
type BillContextType = {
  bills: Bill[];
  dispatch: React.Dispatch<BillAction>;
  getPendingBills: () => Bill[];
  getPaidBills: () => Bill[];
  generateBillId: () => string;
};

// Create context
const BillContext = createContext<BillContextType | undefined>(undefined);

// Reducer function
function billReducer(state: Bill[], action: BillAction): Bill[] {
  switch (action.type) {
    case 'ADD_BILL':
      return [...state, action.payload];
    case 'UPDATE_BILL_STATUS':
      return state.map(bill => 
        bill.id === action.payload.id 
          ? { ...bill, status: action.payload.status } 
          : bill
      );
    default:
      return state;
  }
}

// Provider component
export function BillProvider({ children }: { children: ReactNode }) {
  const [bills, dispatch] = useReducer(billReducer, sampleBills);

  // Get pending bills
  const getPendingBills = () => {
    return bills.filter(bill => bill.status === 'pending');
  };

  // Get paid bills
  const getPaidBills = () => {
    return bills.filter(bill => bill.status === 'paid');
  };

  // Generate a unique bill ID
  const generateBillId = () => {
    const prefix = 'B';
    const num = (bills.length + 1).toString().padStart(3, '0');
    return `${prefix}${num}`;
  };

  return (
    <BillContext.Provider value={{ 
      bills, 
      dispatch, 
      getPendingBills, 
      getPaidBills,
      generateBillId
    }}>
      {children}
    </BillContext.Provider>
  );
}

// Custom hook to use the bill context
export function useBill() {
  const context = useContext(BillContext);
  
  if (context === undefined) {
    throw new Error('useBill must be used within a BillProvider');
  }
  
  return context;
}