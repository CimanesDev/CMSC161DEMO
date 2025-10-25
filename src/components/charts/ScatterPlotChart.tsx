import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { rawTableData } from "@/data/mockData";

export const ScatterPlotChart = () => {
  // Use the exact data from the raw data table, sorted by product views
  const data = rawTableData.sales
    .map(product => ({
      product: product.product,
      productViews: product.productViews,
      revenue: product.revenue,
      unitsSold: product.unitsSold,
      conversionRate: product.conversionRate
    }))
    .sort((a, b) => a.productViews - b.productViews);

  // Color coding based on conversion rate performance
  const getBubbleColor = (conversionRate: number) => {
    if (conversionRate >= 3.0) return '#10b981'; // Green - High conversion
    if (conversionRate >= 2.0) return '#3b82f6'; // Blue - Medium conversion
    return '#f59e0b'; // Orange - Low conversion
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Traffic vs Revenue Analysis</h3>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 40 }}>
          <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" />
          <XAxis 
            dataKey="productViews" 
            name="Product Views"
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            label={{ value: 'Product Views (Traffic)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fontWeight: '500' } }}
            domain={['dataMin - 200', 'dataMax + 200']}
          />
          <YAxis 
            dataKey="revenue" 
            name="Revenue"
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
            label={{ value: 'Revenue (₱)', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fontWeight: '500' } }}
            domain={['dataMin - 2000', 'dataMax + 2000']}
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
              if (name === 'revenue') return [`₱${value.toLocaleString()}`, 'Revenue'];
              if (name === 'productViews') return [`${value.toLocaleString()}`, 'Product Views'];
              if (name === 'unitsSold') return [`${value} units`, 'Units Sold'];
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
          <Scatter 
            dataKey="revenue" 
            fill="#3b82f6"
            r={(entry: any) => Math.max(8, Math.min(20, entry.unitsSold / 3))}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBubbleColor(entry.conversionRate)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">High Conversion (3%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Medium Conversion (2-3%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-600">Low Conversion (&lt;2%)</span>
        </div>
      </div>
    </div>
  );
};
