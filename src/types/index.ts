// Define types for our application

export type Product = {
  id: string;
  name: string;
  category: 'noodles' | 'burger' | 'sauce' | 'other';
  price: number;
  stock: number;
  image?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type PaymentStatus = 'pending' | 'paid';

export type Bill = {
  id: string;
  items: CartItem[];
  total: number;
  status: PaymentStatus;
  customerName: string;
  customerPhone?: string;
  date: string;
  deliveryAddress?: string;
};

export type InventoryAction = 
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_STOCK'; payload: { id: string; quantity: number } };

export type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export type BillAction = 
  | { type: 'ADD_BILL'; payload: Bill }
  | { type: 'UPDATE_BILL_STATUS'; payload: { id: string; status: PaymentStatus } };