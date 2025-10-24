import { BarChart, Bar, ComposedChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rawTableData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProductComparisonChart = () => {
  const [viewType, setViewType] = useState<'revenue' | 'units' | 'comparison'>('revenue');
  
  // Sort products by selected metric (highest to lowest)
  const sortedProducts = [...rawTableData.sales].sort((a, b) => 
    viewType === 'revenue' ? b.revenue - a.revenue : 
    viewType === 'units' ? b.unitsSold - a.unitsSold :
    b.revenue - a.revenue // Default to revenue for comparison
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Product Performance</h3>
          <p className="text-xs text-gray-600">
            {viewType === 'revenue' ? 'Revenue by Victorinox model' : 
             viewType === 'units' ? 'Units sold by Victorinox model' :
             'Revenue vs Units Sold comparison'}
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-md p-1">
          <Button
            variant={viewType === 'revenue' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewType('revenue')}
            className={`px-3 py-1 text-xs ${viewType === 'revenue' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
          >
            Revenue
          </Button>
          <Button
            variant={viewType === 'units' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewType('units')}
            className={`px-3 py-1 text-xs ${viewType === 'units' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
          >
            Units Sold
          </Button>
          <Button
            variant={viewType === 'comparison' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewType('comparison')}
            className={`px-3 py-1 text-xs ${viewType === 'comparison' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
          >
            Comparison
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {viewType === 'comparison' ? (
          <ComposedChart data={sortedProducts} layout="vertical">
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
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '12px'
              }}
              formatter={(value: number, name: string) => [
                name === 'revenue' ? `₱${value.toLocaleString()}` : `${value} units`,
                name === 'revenue' ? 'Revenue' : 'Units Sold'
              ]}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 2, 2, 0]} />
            <Line 
              type="monotone" 
              dataKey="unitsSold" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </ComposedChart>
        ) : (
          <BarChart data={sortedProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(value) => 
                viewType === 'revenue' ? `₱${(value / 1000).toFixed(0)}k` : `${value}`
              }
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
              formatter={(value: number) => [
                viewType === 'revenue' ? `₱${value.toLocaleString()}` : `${value} units`,
                viewType === 'revenue' ? 'Revenue' : 'Units Sold'
              ]}
            />
            <Bar 
              dataKey={viewType === 'revenue' ? 'revenue' : 'unitsSold'} 
              fill="#8b5cf6" 
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
