import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Bread',
    planned: 500,
    inProgress: 250,
    completed: 200,
  },
  {
    name: 'Cookies',
    planned: 300,
    inProgress: 150,
    completed: 100,
  },
  {
    name: 'Pastries',
    planned: 200,
    inProgress: 100,
    completed: 50,
  },
  {
    name: 'Cakes',
    planned: 150,
    inProgress: 75,
    completed: 30,
  },
];

const ProductionStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
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
          width={40}
        />
        <Tooltip
          contentStyle={{ 
            borderRadius: '8px', 
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        />
        <Legend 
          formatter={(value) => <span className="text-gray-700 capitalize">{value}</span>}
        />
        <Bar dataKey="planned" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="inProgress" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductionStatusChart;