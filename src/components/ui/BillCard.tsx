import React from 'react';
import { Bill } from '../../types';
import { useBill } from '../../context/BillContext';
import { CheckCircle, Clock, FileText } from 'lucide-react';

interface BillCardProps {
  bill: Bill;
}

const BillCard: React.FC<BillCardProps> = ({ bill }) => {
  const { dispatch } = useBill();
  
  // Format date
  const formattedDate = new Date(bill.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Mark bill as paid
  const handleMarkAsPaid = () => {
    dispatch({
      type: 'UPDATE_BILL_STATUS',
      payload: { id: bill.id, status: 'paid' }
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Bill #{bill.id}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            bill.status === 'paid' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Customer:</span> {bill.customerName}
          </p>
          {bill.customerPhone && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {bill.customerPhone}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          {bill.deliveryAddress && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery Address:</span> {bill.deliveryAddress}
            </p>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
          <ul className="space-y-1">
            {bill.items.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex justify-between">
                <span>{item.quantity}x {item.product.name}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">
            Total: ${bill.total.toFixed(2)}
          </span>
          
          {bill.status === 'pending' && (
            <button
              onClick={handleMarkAsPaid}
              className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Mark as Paid
            </button>
          )}
          
          {bill.status === 'paid' && (
            <div className="inline-flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Paid
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillCard;