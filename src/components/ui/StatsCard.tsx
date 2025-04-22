import React from 'react';
import { Package, ShoppingCart, DollarSign, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: 'inventory' | 'sales' | 'pending' | 'revenue';
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend 
}) => {
  // Get icon component based on type
  const getIcon = () => {
    switch (icon) {
      case 'inventory':
        return (
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Package className="w-6 h-6" />
          </div>
        );
      case 'sales':
        return (
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
        );
      case 'pending':
        return (
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
        );
      case 'revenue':
        return (
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <DollarSign className="w-6 h-6" />
          </div>
        );
      default:
        return null;
    }
  };

  // Get trend color
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 transform transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <p className={`mt-1 text-sm ${getTrendColor()}`}>
              {change} {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
            </p>
          )}
        </div>
        
        {getIcon()}
      </div>
    </div>
  );
};

export default StatsCard;