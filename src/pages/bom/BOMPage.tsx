import { useState, useEffect } from 'react';
import { Plus, FileText, Search, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useToast } from '../../components/ui/Toaster';

interface BOMItem {
  id: string;
  name: string;
  version: string;
  yield_quantity: number;
  yield_unit: string;
  total_cost: number;
  is_active: boolean;
  created_at: string;
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    unit_cost: number;
    total_cost: number;
    type: 'ingredient' | 'packaging';
  }[];
}

const BOMPage = () => {
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    fetchBOMItems();
  }, []);

  const fetchBOMItems = async () => {
    try {
      const { data: bomData, error: bomError } = await supabase
        .from('bom_items')
        .select(`
          id,
          name,
          version,
          yield_quantity,
          yield_unit,
          total_cost,
          is_active,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (bomError) throw bomError;

      const bomItemsWithIngredients = await Promise.all(
        (bomData || []).map(async (bom) => {
          const { data: ingredients, error: ingredientsError } = await supabase
            .from('bom_ingredients')
            .select(`
              id,
              inventory_item_id,
              quantity,
              unit,
              unit_cost,
              total_cost,
              type
            `)
            .eq('bom_id', bom.id);

          if (ingredientsError) throw ingredientsError;

          return {
            ...bom,
            ingredients: ingredients || [],
          };
        })
      );

      setBomItems(bomItemsWithIngredients);
    } catch (error) {
      console.error('Error fetching BOM items:', error);
      addToast('Failed to load BOM items', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredBOMItems = bomItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bill of Materials</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product recipes and formulas
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Create BOM
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search BOMs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yield
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBOMItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <FileText size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.ingredients.length} ingredients
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.yield_quantity} {item.yield_unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.total_cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge color={item.is_active ? 'green' : 'gray'}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Trash2 size={16} />
                    </button>
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

export default BOMPage;