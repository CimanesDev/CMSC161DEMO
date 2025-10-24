import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
            formatter={(value: number, name: string) => [
              `₱${value.toLocaleString()}`,
              name === 'goal' ? 'Goal' : 'Actual Savings'
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value) => value === 'goal' ? 'Goal' : 'Actual Savings'}
          />
          <Bar dataKey="goal" fill="#e2e8f0" name="goal" radius={[2, 2, 0, 0]} />
          <Bar dataKey="actual" fill="#10b981" name="actual" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
