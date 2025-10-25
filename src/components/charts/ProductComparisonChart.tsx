import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rawTableData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProductComparisonChart = () => {
  const [viewType, setViewType] = useState<'revenue' | 'units'>('revenue');
  
  // Sort products by selected metric (highest to lowest)
  const sortedProducts = [...rawTableData.sales].sort((a, b) => 
    viewType === 'revenue' ? b.revenue - a.revenue : 
    b.unitsSold - a.unitsSold
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Product Performance</h3>
          <p className="text-xs text-gray-600">
            {viewType === 'revenue' ? 'Revenue by Victorinox model' : 
             'Units sold by Victorinox model'}
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
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={sortedProducts} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" horizontal={false} />
          <XAxis 
            type="number" 
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            tickFormatter={(value) => 
              viewType === 'revenue' ? `₱${(value / 1000).toFixed(0)}k` : `${value}`
            }
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
      </ResponsiveContainer>
    </div>
  );
};
