import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { financialData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface NetWorthChartProps {
  transactions?: Transaction[];
}

export const NetWorthChart = ({ transactions = [] }: NetWorthChartProps) => {
  const [chartType, setChartType] = useState<'income' | 'expenses' | 'comparison'>('income');
  
  // Use raw table data for income and expenses
  const incomeData = [
    { month: 'Jan', value: 4875 },
    { month: 'Feb', value: 5234 },
    { month: 'Mar', value: 5123 },
    { month: 'Apr', value: 5467 },
    { month: 'May', value: 5345 },
    { month: 'Jun', value: 4567 },
    { month: 'Jul', value: 5689 },
    { month: 'Aug', value: 5523 },
    { month: 'Sep', value: 5745 },
    { month: 'Oct', value: 5834 },
  ].map((month, index) => {
    // Only add transaction income to October (current month)
    const transactionIncome = month.month === 'Oct' ? 
      transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0) : 0;
    return {
      month: month.month,
      value: month.value + transactionIncome
    };
  });

  const expensesData = financialData.expenses.map(month => {
    // Only add transaction expenses to October (current month)
    const transactionExpenses = month.month === 'Oct' ? 
      transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0) : 0;
    return {
      month: month.month,
      value: month.value + transactionExpenses
    };
  });

  // For comparison, combine both datasets
  const comparisonData = incomeData.map((income, index) => ({
    month: income.month,
    income: income.value,
    expenses: expensesData[index].value
  }));

  const currentData = chartType === 'income' ? incomeData : 
                     chartType === 'expenses' ? expensesData : 
                     comparisonData;

  const trend = chartType === 'comparison' ? 0 : 
    currentData.length > 0 ? ((currentData[currentData.length - 1].value - currentData[0].value) / currentData[0].value * 100).toFixed(1) : 0;
  const isPositive = parseFloat(trend) >= 0;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {chartType === 'income' ? 'Income Trend' : 
             chartType === 'expenses' ? 'Expenses Trend' : 
             'Income vs Expenses Comparison'}
          </h3>
          <p className="text-xs text-gray-600">12-Month Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-md p-1">
            <Button
              variant={chartType === 'income' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('income')}
              className={`px-2 py-1 text-xs ${chartType === 'income' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              Income
            </Button>
            <Button
              variant={chartType === 'expenses' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('expenses')}
              className={`px-2 py-1 text-xs ${chartType === 'expenses' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              Expenses
            </Button>
            <Button
              variant={chartType === 'comparison' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('comparison')}
              className={`px-2 py-1 text-xs ${chartType === 'comparison' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              Comparison
            </Button>
          </div>
          {chartType !== 'comparison' && (
            <div className={`${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-xs font-medium">{isPositive ? '+' : ''}{trend}%</span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={currentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={11}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
            domain={['dataMin - 500', 'dataMax + 500']}
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
              `₱${value.toLocaleString()}`, 
              chartType === 'comparison' ? (name === 'income' ? 'Income' : 'Expenses') :
              chartType === 'income' ? 'Income' : 'Expenses'
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value, entry: any) => {
              if (chartType === 'comparison') {
                return value === 'income' ? 'Income' : 'Expenses';
              }
              return chartType === 'income' ? 'Income' : 'Expenses';
            }}
          />
          {chartType === 'comparison' ? (
            <>
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                name="expenses"
              />
            </>
          ) : (
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartType === 'income' ? '#3b82f6' : '#ef4444'} 
              strokeWidth={3}
              dot={{ fill: chartType === 'income' ? '#3b82f6' : '#ef4444', r: 4 }}
              activeDot={{ r: 6, stroke: chartType === 'income' ? '#3b82f6' : '#ef4444', strokeWidth: 2 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};