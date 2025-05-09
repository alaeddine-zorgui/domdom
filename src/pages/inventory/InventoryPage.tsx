import { useState } from 'react';
import { 
  Plus, 
  FileDown, 
  Filter,
  Search,
  Package,
  AlertTriangle,
  Check
} from 'lucide-react';
import { mockInventoryItems } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter inventory items based on search term and category filter
  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'raw-material':
        return <Badge color="blue">Raw Material</Badge>;
      case 'finished-product':
        return <Badge color="green">Finished Product</Badge>;
      case 'packaging':
        return <Badge color="orange">Packaging</Badge>;
      default:
        return <Badge color="gray">{category}</Badge>;
    }
  };

  const getStockStatus = (item: typeof mockInventoryItems[0]) => {
    const stockRatio = item.stockQuantity / item.reorderLevel;
    
    if (stockRatio <= 0.25) {
      return (
        <div className="flex items-center text-error-700">
          <AlertTriangle size={16} className="mr-1" />
          <span>Critical</span>
        </div>
      );
    }
    
    if (stockRatio <= 1) {
      return (
        <div className="flex items-center text-warning-600">
          <AlertTriangle size={16} className="mr-1" />
          <span>Low</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-success-600">
        <Check size={16} className="mr-1" />
        <span>Good</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your raw materials, finished products, and packaging inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown size={16} className="mr-2" />
            Export
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    onClick={() => setCategoryFilter(null)}
                  >
                    <Filter size={16} className="mr-2" />
                    {categoryFilter ? `Filter: ${categoryFilter}` : 'All Categories'}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCategoryFilter('raw-material')}
                  className={`px-3 py-2 text-xs font-medium rounded-md ${
                    categoryFilter === 'raw-material' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Raw Materials
                </button>
                <button
                  onClick={() => setCategoryFilter('finished-product')}
                  className={`px-3 py-2 text-xs font-medium rounded-md ${
                    categoryFilter === 'finished-product' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Finished Products
                </button>
                <button
                  onClick={() => setCategoryFilter('packaging')}
                  className={`px-3 py-2 text-xs font-medium rounded-md ${
                    categoryFilter === 'packaging' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Packaging
                </button>
              </div>
            </div>
          </div>
        </div>
        
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
                  Stock Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Cost
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 animate-fade-in">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">ID: {item.id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(item.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.stockQuantity} {item.unit}</div>
                    <div className="text-xs text-gray-500">Reorder at: {item.reorderLevel} {item.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStockStatus(item)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.unitCost.toFixed(2)} / {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${(item.stockQuantity * item.unitCost).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default InventoryPage;