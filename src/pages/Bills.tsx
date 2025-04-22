import React, { useState } from 'react';
import { useBill } from '../context/BillContext';
import BillCard from '../components/ui/BillCard';
import { Search, Clock, CheckCircle } from 'lucide-react';

const Bills: React.FC = () => {
  const { bills } = useBill();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter bills based on search term and status filter
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'pending' && bill.status === 'pending') || 
      (filter === 'paid' && bill.status === 'paid');
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort bills by date (newest first)
  const sortedBills = [...filteredBills].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bills</h1>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bills by ID or customer name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all'
                  ? 'bg-gray-200 text-gray-800 font-medium'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex items-center px-4 py-2 rounded-md ${
                filter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 font-medium'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              <Clock className="w-4 h-4 mr-1" />
              Pending
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`flex items-center px-4 py-2 rounded-md ${
                filter === 'paid'
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Paid
            </button>
          </div>
        </div>
      </div>
      
      {/* Bills List */}
      {sortedBills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedBills.map(bill => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">No bills found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Bills;