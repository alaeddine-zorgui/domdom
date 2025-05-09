import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data
const dailyData = [
  { name: '6AM', revenue: 1200, profit: 680 },
  { name: '9AM', revenue: 1600, profit: 820 },
  { name: '12PM', revenue: 2400, profit: 1100 },
  { name: '3PM', revenue: 3000, profit: 1400 },
  { name: '6PM', revenue: 3800, profit: 1800 },
  { name: '9PM', revenue: 4200, profit: 2000 },
];

const weeklyData = [
  { name: 'Mon', revenue: 4200, profit: 2000 },
  { name: 'Tue', revenue: 3800, profit: 1800 },
  { name: 'Wed', revenue: 4600, profit: 2200 },
  { name: 'Thu', revenue: 4000, profit: 1900 },
  { name: 'Fri', revenue: 5200, profit: 2500 },
  { name: 'Sat', revenue: 6800, profit: 3400 },
  { name: 'Sun', revenue: 5600, profit: 2700 },
];

const monthlyData = [
  { name: 'Week 1', revenue: 28000, profit: 13500 },
  { name: 'Week 2', revenue: 32000, profit: 15500 },
  { name: 'Week 3', revenue: 35000, profit: 17000 },
  { name: 'Week 4', revenue: 38000, profit: 18500 },
];

interface SalesChartProps {
  timeRange: 'day' | 'week' | 'month';
}

const SalesChart = ({ timeRange }: SalesChartProps) => {
  const getChartData = () => {
    switch (timeRange) {
      case 'day':
        return dailyData;
      case 'month':
        return monthlyData;
      case 'week':
      default:
        return weeklyData;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={getChartData()}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
        />
        <YAxis 
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value}`, '']}
          contentStyle={{ 
            borderRadius: '8px', 
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
          formatter={(value) => <span className="text-gray-700 capitalize">{value}</span>}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorRevenue)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#colorProfit)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;