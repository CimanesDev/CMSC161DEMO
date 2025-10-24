import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { salesData } from "@/data/mockData";

interface SalesTrendChartProps {
  timeFilter: 'week' | 'month' | 'quarter';
}

export const SalesTrendChart = ({ timeFilter }: SalesTrendChartProps) => {
  const getData = () => {
    switch (timeFilter) {
      case 'week':
        return salesData.dailyRevenue;
      case 'month':
        return salesData.weeklyTrend;
      case 'quarter':
        return salesData.weeklyTrend.map(week => ({
          ...week,
          week: week.week.replace('Week', 'Q1 Week')
        }));
      default:
        return salesData.dailyRevenue;
    }
  };

  const data = getData();
  const isDaily = timeFilter === 'week';

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          {isDaily ? 'Daily Sales Performance' : 'Weekly Sales Trend'}
        </h3>
        <p className="text-xs text-gray-600">
          {isDaily ? 'Blue bars = Daily Revenue, Green line = Average Order Value' : 'Sales growth over 4 weeks'}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey={isDaily ? 'day' : 'week'} 
            stroke="#64748b"
            fontSize={11}
          />
          <YAxis 
            yAxisId="revenue"
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            yAxisId="aov"
            orientation="right"
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(value) => `₱${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
            formatter={(value: number, name: string) => [
              name === 'revenue' ? `₱${value.toLocaleString()}` : `₱${value}`,
              name === 'revenue' ? 'Revenue' : 'AOV'
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value) => value === 'revenue' ? 'Revenue' : 'Average Order Value'}
          />
          <Bar 
            yAxisId="revenue"
            dataKey="revenue" 
            fill="#3b82f6" 
            name="revenue"
            radius={[2, 2, 0, 0]}
          />
          <Line 
            yAxisId="aov"
            type="monotone" 
            dataKey="aov" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            name="aov"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
