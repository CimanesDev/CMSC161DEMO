import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { rawTableData } from "@/data/mockData";

const COLORS = {
  'In Stock': '#10b981',
  'Low Stock': '#f59e0b', 
  'Out of Stock': '#ef4444'
};

export const InventoryStatusChart = () => {
  // Calculate real inventory status from table data
  const inventoryData = rawTableData.sales.map(product => {
    if (product.stock < 10) return { category: 'Low Stock', count: 1, percentage: 0 };
    return { category: 'In Stock', count: 1, percentage: 0 };
  });

  // Group and count by category
  const data = inventoryData.reduce((acc, item) => {
    const existing = acc.find(x => x.category === item.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, [] as any[]);

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.count, 0);
  data.forEach(item => {
    item.percentage = Math.round((item.count / total) * 100);
  });

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Inventory Status</h3>
        <p className="text-xs text-gray-600">Current stock levels across all products</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="count"
            label={({ percentage }) => `${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              padding: '12px'
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value} items (${props.payload.percentage}%)`,
              props.payload.category
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value, entry: any) => entry.payload.category}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
