import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Raw Materials', value: 12500, color: '#3B82F6' },
  { name: 'Finished Products', value: 18700, color: '#10B981' },
  { name: 'Packaging', value: 5300, color: '#F97316' },
];

const COLORS = ['#3B82F6', '#10B981', '#F97316'];

const InventoryStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          layout="horizontal"
          formatter={(value, entry, index) => {
            return <span className="text-gray-700">{value}</span>;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default InventoryStatusChart;