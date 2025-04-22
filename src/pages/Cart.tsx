import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useBill } from '../context/BillContext';
import { useInventory } from '../context/InventoryContext';
import { ShoppingBag, Plus, Minus, Trash2, FileText } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Modal from '../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, dispatch: cartDispatch, getTotal, getItemCount } = useCart();
  const { dispatch: billDispatch, generateBillId } = useBill();
  const { products, dispatch: inventoryDispatch } = useInventory();
  const navigate = useNavigate();
  
  // State for checkout modal
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  
  // Handle customer info change
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };
  
  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      cartDispatch({
        type: 'REMOVE_ITEM',
        payload: id
      });
    } else {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity }
      });
    }
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    cartDispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };
  
  // Process checkout
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new bill
    const bill = {
      id: generateBillId(),
      items: [...cartItems],
      total: getTotal(),
      status: 'pending' as const,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone || undefined,
      date: new Date().toISOString(),
      deliveryAddress: customerInfo.address || undefined
    };
    
    // Add bill to context
    billDispatch({
      type: 'ADD_BILL',
      payload: bill
    });
    
    // Update inventory
    cartItems.forEach(item => {
      inventoryDispatch({
        type: 'UPDATE_STOCK',
        payload: {
          id: item.product.id,
          quantity: item.quantity
        }
      });
    });
    
    // Clear cart
    cartDispatch({ type: 'CLEAR_CART' });
    
    // Close modal and navigate to bills page
    setIsCheckoutModalOpen(false);
    navigate('/bills');
  };
  
  // Filter out products that are already in cart
  const availableProducts = products.filter(
    product => !cartItems.some(item => item.product.id === product.id)
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product selection */}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Create New Sale</h1>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Select Products</h2>
          
          {availableProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              All products have been added to cart
            </p>
          )}
        </div>
      </div>
      
      {/* Cart */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-orange-50 border-b border-orange-100 flex items-center">
            <ShoppingBag className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Cart</h2>
            {getItemCount() > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded-full">
                {getItemCount()} items
              </span>
            )}
          </div>
          
          <div className="p-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <span className="mx-2 w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        disabled={item.product.stock <= 0}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-3 p-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">
                  Add items from the product list
                </p>
              </div>
            )}
            
            {cartItems.length > 0 && (
              <>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Bill
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        title="Checkout"
      >
        <form onSubmit={handleCheckout}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Customer Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInfoChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (optional)
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInfoChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address (optional)
              </label>
              <textarea
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInfoChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Order Summary</h4>
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity} x {item.product.name}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Complete Sale
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Cart;