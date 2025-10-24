import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rawTableData } from "@/data/mockData";

export const SalesCompositionChart = () => {
  // Sort products by units sold (highest to lowest) for better visualization
  const data = [...rawTableData.sales].sort((a, b) => b.unitsSold - a.unitsSold);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Most Sold Products</h3>
        <p className="text-xs text-gray-600">Units sold breakdown by Victorinox model</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            stroke="#64748b"
            fontSize={11}
          />
          <YAxis 
            dataKey="product" 
            type="category"
            stroke="#64748b"
            fontSize={11}
            width={100}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value} units`, 'Units Sold']}
          />
          <Bar 
            dataKey="unitsSold" 
            fill="#3b82f6" 
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
