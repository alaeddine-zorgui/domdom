import { ArrowUp, ArrowDown } from 'lucide-react';

const topProducts = [
  {
    id: 1,
    name: 'White Bread (500g)',
    quantity: 864,
    revenue: 1728,
    trend: 'up',
    change: 8.2,
  },
  {
    id: 2,
    name: 'Chocolate Chip Cookies (12pk)',
    quantity: 612,
    revenue: 2448,
    trend: 'up',
    change: 12.7,
  },
  {
    id: 3,
    name: 'Wheat Bread (700g)',
    quantity: 528,
    revenue: 1584,
    trend: 'down',
    change: 2.3,
  },
  {
    id: 4,
    name: 'Vanilla Cupcakes (6pk)',
    quantity: 392,
    revenue: 1176,
    trend: 'up',
    change: 5.8,
  },
  {
    id: 5,
    name: 'Croissants (4pk)',
    quantity: 347,
    revenue: 1388,
    trend: 'down',
    change: 1.4,
  },
];

const TopSellingProducts = () => {
  return (
    <div className="divide-y divide-gray-200">
      {topProducts.map((product) => (
        <div key={product.id} className="py-3 flex items-center justify-between animate-fade-in">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500">
                {product.quantity} units
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">
                ${product.revenue.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {product.trend === 'up' ? (
              <span className="flex items-center text-xs text-success-500">
                <ArrowUp size={14} className="mr-1" />
                {product.change}%
              </span>
            ) : (
              <span className="flex items-center text-xs text-error-500">
                <ArrowDown size={14} className="mr-1" />
                {product.change}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSellingProducts;