import { AlertTriangle } from 'lucide-react';
import Button from '../../../components/ui/Button';

const lowStockItems = [
  {
    id: 1,
    name: 'All-Purpose Flour',
    category: 'raw-material',
    currentStock: 50,
    unit: 'kg',
    reorderLevel: 100,
    supplier: 'Global Ingredients Ltd.',
  },
  {
    id: 2,
    name: 'Granulated Sugar',
    category: 'raw-material',
    currentStock: 30,
    unit: 'kg',
    reorderLevel: 75,
    supplier: 'SweetSupplies Inc.',
  },
  {
    id: 3,
    name: 'Bread Packaging',
    category: 'packaging',
    currentStock: 200,
    unit: 'pieces',
    reorderLevel: 500,
    supplier: 'PackRight Solutions',
  },
  {
    id: 4,
    name: 'Butter',
    category: 'raw-material',
    currentStock: 15,
    unit: 'kg',
    reorderLevel: 40,
    supplier: 'Dairy Direct',
  },
];

const LowStockItems = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Stock
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reorder Level
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Supplier
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lowStockItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 animate-fade-in">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-warning-500 mr-2" />
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {item.category === 'raw-material' ? 'Raw Material' : 'Packaging'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.currentStock} {item.unit}</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-warning-500 rounded-full" 
                    style={{ width: `${(item.currentStock / item.reorderLevel) * 100}%` }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.reorderLevel} {item.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.supplier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button
                  variant="outline"
                  size="small"
                >
                  Reorder
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockItems;