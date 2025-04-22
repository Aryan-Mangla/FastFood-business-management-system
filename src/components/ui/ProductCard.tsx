import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useInventory } from '../../context/InventoryContext';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  inCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inCart = false }) => {
  const { cartItems, dispatch: cartDispatch } = useCart();
  const { dispatch: inventoryDispatch } = useInventory();
  
  // Find if product is in cart
  const cartItem = cartItems.find(item => item.product.id === product.id);
  const isInCart = Boolean(cartItem);
  const quantity = cartItem?.quantity || 0;
  
  // Stock status
  const getStockStatus = () => {
    if (product.stock <= 0) return 'text-red-500';
    if (product.stock < 10) return 'text-orange-500';
    return 'text-green-500';
  };
  
  // Add to cart handler
  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    
    cartDispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity: 1 }
    });
  };
  
  // Increase quantity
  const handleIncreaseQuantity = () => {
    if (product.stock <= 0) return;
    
    cartDispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: quantity + 1 }
    });
  };
  
  // Decrease quantity
  const handleDecreaseQuantity = () => {
    if (quantity <= 0) return;
    
    cartDispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: quantity - 1 }
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg">
      {product.image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className="text-orange-600 font-bold">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">{product.category}</span>
          <span className={`text-sm font-medium ${getStockStatus()}`}>
            Stock: {product.stock}
          </span>
        </div>
        
        <div className="mt-4">
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full py-2 px-3 rounded-md text-white font-medium 
                ${product.stock > 0 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={handleDecreaseQuantity}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              
              <span className="mx-2 text-gray-800 font-medium">{quantity}</span>
              
              <button
                onClick={handleIncreaseQuantity}
                disabled={product.stock <= 0}
                className={`p-1 rounded-full ${
                  product.stock > 0 
                    ? 'bg-gray-200 hover:bg-gray-300' 
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;