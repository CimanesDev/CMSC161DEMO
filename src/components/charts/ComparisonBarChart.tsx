import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { rawTableData } from "@/data/mockData";

export const ComparisonBarChart = () => {
  // Prepare data for comparison chart, sorted by conversion rate (descending) for better insights
  const data = rawTableData.sales
    .map(product => ({
      product: product.product,
      productViews: product.productViews,
      unitsSold: product.unitsSold,
      conversionRate: product.conversionRate
    }))
    .sort((a, b) => b.conversionRate - a.conversionRate);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Traffic vs Sales Efficiency</h3>
        <p className="text-xs text-gray-500 mt-1">Sorted by conversion rate (highest first)</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" horizontal={false} />
          <XAxis 
            type="number" 
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            label={{ value: 'Volume (Views and Units)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fontSize: '12px', fontWeight: '500' } }}
          />
          <YAxis 
            dataKey="product" 
            type="category"
            stroke="#64748b"
            fontSize={11}
            fontWeight={500}
            width={120}
            tick={{ fontSize: 11 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              padding: '12px'
            }}
            formatter={(value: number, name: string, props: any) => {
              if (name === 'productViews') {
                return [`${value.toLocaleString()} views`, 'Product Views'];
              }
              if (name === 'unitsSold') {
                return [`${value} units`, 'Units Sold'];
              }
              return [value, name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                const data = payload[0].payload;
                return `${data.product} (${data.conversionRate}% conversion)`;
              }
              return '';
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value) => value === 'productViews' ? 'Product Views' : 'Units Sold'}
          />
          <Bar 
            dataKey="productViews" 
            fill="#3b82f6" 
            name="productViews"
            radius={[0, 2, 2, 0]}
            opacity={0.8}
          />
          <Bar 
            dataKey="unitsSold" 
            fill="#10b981" 
            name="unitsSold"
            radius={[0, 2, 2, 0]}
            opacity={0.9}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
