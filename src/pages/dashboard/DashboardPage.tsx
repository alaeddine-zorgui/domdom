import { useState } from 'react';
import { 
  Package, 
  TrendingDown, 
  Factory, 
  ShoppingCart, 
  Users, 
  Truck, 
  TrendingUp, 
  DollarSign
} from 'lucide-react';
import MetricCard from './components/MetricCard';
import InventoryStatusChart from './components/InventoryStatusChart';
import SalesChart from './components/SalesChart';
import ProductionStatusChart from './components/ProductionStatusChart';
import TopSellingProducts from './components/TopSellingProducts';
import LowStockItems from './components/LowStockItems';
import { mockDashboardMetrics } from '../../data/mockData';
import Card from '../../components/ui/Card';

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setTimeRange('day')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeRange === 'day'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === 'month'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Inventory Value"
          value={`$${mockDashboardMetrics.totalInventoryValue.toLocaleString()}`}
          change={2.5}
          trend="up"
          icon={<Package className="text-primary-600" />}
        />
        <MetricCard
          title="Low Stock Items"
          value={mockDashboardMetrics.lowStockItems.toString()}
          change={-1}
          trend="down"
          isNegativeTrendGood
          icon={<TrendingDown className="text-warning-500" />}
        />
        <MetricCard
          title="Ongoing Productions"
          value={mockDashboardMetrics.ongoingProductions.toString()}
          change={0}
          trend="neutral"
          icon={<Factory className="text-secondary-600" />}
        />
        <MetricCard
          title="Daily Sales"
          value={`$${mockDashboardMetrics.dailySales.toLocaleString()}`}
          change={12.3}
          trend="up"
          icon={<ShoppingCart className="text-accent-600" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Status */}
        <Card>
          <Card.Header>
            <Card.Title>Inventory Status</Card.Title>
            <Card.Description>Current inventory levels by category</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <InventoryStatusChart />
            </div>
          </Card.Content>
        </Card>

        {/* Sales Trends */}
        <Card>
          <Card.Header>
            <Card.Title>Sales Trends</Card.Title>
            <Card.Description>Revenue and profit for the {timeRange}</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <SalesChart timeRange={timeRange} />
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Status */}
        <Card>
          <Card.Header>
            <Card.Title>Production Status</Card.Title>
            <Card.Description>Current production orders status</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="h-64">
              <ProductionStatusChart />
            </div>
          </Card.Content>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <Card.Header>
            <Card.Title>Top Selling Products</Card.Title>
            <Card.Description>Highest selling products for the period</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="h-64 overflow-auto">
              <TopSellingProducts />
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Secondary metrics */}
        <MetricCard
          title="Employees Present"
          value={mockDashboardMetrics.employeesPresent.toString()}
          subtitle="of 24 total employees"
          icon={<Users className="text-primary-600" />}
        />
        <MetricCard
          title="Pending Deliveries"
          value={mockDashboardMetrics.pendingDeliveries.toString()}
          subtitle="scheduled for today"
          icon={<Truck className="text-accent-600" />}
        />
        <MetricCard
          title="Monthly Profit"
          value={`$${mockDashboardMetrics.monthlyProfit.toLocaleString()}`}
          change={8.7}
          trend="up"
          icon={<DollarSign className="text-success-500" />}
        />
      </div>

      {/* Low Stock Items */}
      <Card>
        <Card.Header>
          <Card.Title>Low Stock Items</Card.Title>
          <Card.Description>Items below reorder level that need attention</Card.Description>
        </Card.Header>
        <Card.Content>
          <LowStockItems />
        </Card.Content>
      </Card>
    </div>
  );
};

export default DashboardPage;