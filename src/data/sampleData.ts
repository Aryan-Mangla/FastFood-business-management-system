import { Product, Bill } from '../types';

// Sample inventory data
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Instant Noodles',
    category: 'noodles',
    price: 2.50,
    stock: 100,
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Chicken Burger',
    category: 'burger',
    price: 5.99,
    stock: 30,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Vegetable Noodles',
    category: 'noodles',
    price: 3.75,
    stock: 45,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Hot Sauce',
    category: 'sauce',
    price: 1.99,
    stock: 75,
    image: 'https://images.pexels.com/photos/2612371/pexels-photo-2612371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Cheese Burger',
    category: 'burger',
    price: 6.50,
    stock: 25,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    name: 'Soy Sauce',
    category: 'sauce',
    price: 2.25,
    stock: 60,
    image: 'https://images.pexels.com/photos/5175606/pexels-photo-5175606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    name: 'Spicy Noodles',
    category: 'noodles',
    price: 3.99,
    stock: 40,
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    name: 'Vegan Burger',
    category: 'burger',
    price: 7.25,
    stock: 15,
    image: 'https://images.pexels.com/photos/3607284/pexels-photo-3607284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Sample bills data
export const sampleBills: Bill[] = [
  {
    id: 'B001',
    items: [
      { product: sampleProducts[0], quantity: 2 },
      { product: sampleProducts[3], quantity: 1 }
    ],
    total: 7.00,
    status: 'paid',
    customerName: 'John Smith',
    customerPhone: '555-1234',
    date: '2025-01-10T14:30:00',
  },
  {
    id: 'B002',
    items: [
      { product: sampleProducts[1], quantity: 1 },
      { product: sampleProducts[5], quantity: 1 }
    ],
    total: 8.24,
    status: 'pending',
    customerName: 'Sarah Johnson',
    customerPhone: '555-5678',
    date: '2025-01-11T12:15:00',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: 'B003',
    items: [
      { product: sampleProducts[2], quantity: 2 },
      { product: sampleProducts[4], quantity: 1 }
    ],
    total: 14.00,
    status: 'pending',
    customerName: 'Michael Brown',
    date: '2025-01-11T16:45:00',
  }
];