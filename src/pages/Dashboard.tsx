import React from 'react';
import StatsCard from '../components/ui/StatsCard';
import { useInventory } from '../context/InventoryContext';
import { useBill } from '../context/BillContext';
import { Package, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BillCard from '../components/ui/BillCard';

const Dashboard: React.FC = () => {
  const { products, getLowStockProducts } = useInventory();
  const { bills, getPendingBills } = useBill();
  
  // Get low stock products
  const lowStockProducts = getLowStockProducts();
  
  // Get pending bills
  const pendingBills = getPendingBills();
  
  // Calculate total revenue
  const totalRevenue = bills.reduce((total, bill) => {
    return bill.status === 'paid' ? total + bill.total : total;
  }, 0);
  
  // Calculate total inventory value
  const inventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.stock);
  }, 0);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link 
          to="/cart" 
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          New Sale
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Inventory" 
          value={products.length} 
          icon="inventory" 
        />
        <StatsCard 
          title="Inventory Value" 
          value={`$${inventoryValue.toFixed(2)}`} 
          icon="revenue" 
        />
        <StatsCard 
          title="Pending Bills" 
          value={pendingBills.length} 
          icon="pending" 
        />
        <StatsCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`}
          icon="revenue"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-orange-50 border-b border-orange-100 flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Low Stock Alerts</h2>
          </div>
          
          <div className="p-4">
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-600 font-bold">{product.stock} left</p>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No low stock items</p>
            )}
            
            <div className="mt-4">
              <Link 
                to="/inventory" 
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                View all inventory →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent Bills */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
            <h2 className="text-lg font-medium text-gray-800">Recent Bills</h2>
          </div>
          
          <div className="p-4">
            {pendingBills.length > 0 ? (
              <div className="space-y-4">
                {pendingBills.slice(0, 3).map(bill => (
                  <div key={bill.id} className="border border-gray-200 rounded-lg">
                    <BillCard bill={bill} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No pending bills</p>
            )}
            
            <div className="mt-4">
              <Link 
                to="/bills" 
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                View all bills →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;