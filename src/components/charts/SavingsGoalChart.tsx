import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { financialData } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface SavingsGoalChartProps {
  transactions?: Transaction[];
}

export const SavingsGoalChart = ({ transactions = [] }: SavingsGoalChartProps) => {
  const [goalAmount, setGoalAmount] = useState(1500);
  
  // Calculate monthly savings including new transactions
  const monthlySavings = financialData.netWorth.map((month, index) => {
    const baseIncome = 5000 + (index * 100); // Approximate income growth
    const baseExpenses = financialData.expenses[index]?.value || 4000;
    
    // Add new transactions for this month
    const monthTransactions = transactions.filter(t => {
      const transactionMonth = t.date.getMonth();
      return transactionMonth === index;
    });
    
    const transactionIncome = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const transactionExpenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalIncome = baseIncome + transactionIncome;
    const totalExpenses = baseExpenses + transactionExpenses;
    const actualSavings = totalIncome - totalExpenses;
    
    return {
      month: month.month,
      goal: goalAmount,
      actual: Math.max(0, actualSavings),
      achieved: actualSavings >= goalAmount
    };
  });

  // Calculate achievement statistics
  const achievedCount = monthlySavings.filter(month => month.achieved).length;
  const totalMonths = monthlySavings.length;
  const achievementRate = Math.round((achievedCount / totalMonths) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Monthly Savings Goal</h3>
          <p className="text-xs text-gray-600">Set your monthly savings target</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="goal" className="text-xs">Target (₱)</Label>
          <Input
            id="goal"
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
            className="w-20 h-6 text-xs"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthlySavings}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={11}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(value) => `₱${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
            formatter={(value: number, name: string, props: any) => {
              const achieved = props.payload?.achieved;
              const status = achieved ? '✅ Goal Achieved' : '❌ Goal Missed';
              return [
                `₱${value.toLocaleString()}`,
                name === 'goal' ? 'Goal' : `Actual Savings (${status})`
              ];
            }}
          />
          <Bar dataKey="goal" fill="#e2e8f0" name="goal" radius={[2, 2, 0, 0]} />
          <Bar 
            dataKey="actual" 
            name="actual" 
            radius={[2, 2, 0, 0]}
          >
            {monthlySavings.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.achieved ? '#10b981' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-300"></div>
          <span className="text-gray-600">Monthly Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className="text-gray-600">Goal Achieved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-gray-600">Goal Missed</span>
        </div>
      </div>

      {/* Clean Achievement Summary */}
      <div className="text-center">
        <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
          achievementRate >= 70 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : achievementRate >= 50 
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {achievementRate}% goal achievement ({achievedCount} of {totalMonths} months)
        </div>
      </div>
    </div>
  );
};
