import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rawTableData } from "@/data/mockData";

interface SalesTrendChartProps {
  timeFilter: 'week' | 'month' | 'quarter';
}

export const SalesTrendChart = ({ timeFilter }: SalesTrendChartProps) => {
  // Use real sales data from rawTableData
  const data = rawTableData.sales.map(product => ({
    product: product.product,
    revenue: product.revenue,
    unitsSold: product.unitsSold,
    margin: product.margin
  }));

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Product Revenue Performance
        </h3>
        <p className="text-xs text-gray-600">
          Revenue by Victorinox Swiss Army knife model
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
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
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
            formatter={(value: number) => [
              `₱${value.toLocaleString()}`,
              'Revenue'
            ]}
          />
          <Bar 
            dataKey="revenue" 
            fill="#3b82f6" 
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
