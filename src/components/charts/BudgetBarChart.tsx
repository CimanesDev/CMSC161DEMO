import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { financialData } from "@/data/mockData";
import { AlertCircle } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface BudgetBarChartProps {
  transactions?: Transaction[];
}

export const BudgetBarChart = ({ transactions = [] }: BudgetBarChartProps) => {
  // Calculate actual spending including new transactions
  const budgetData = financialData.budget.map(category => ({ ...category }));
  
  // Add new expense transactions to actual spending
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const existingCategory = budgetData.find(cat => cat.category === transaction.category);
      if (existingCategory) {
        existingCategory.actual += transaction.amount;
      }
    }
  });

  const overBudget = budgetData.filter(item => item.actual > item.budgeted).length;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Budget vs. Actual</h3>
            <p className="text-sm text-slate-600">Key Categories</p>
          </div>
          {overBudget > 0 && (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{overBudget} Over Budget</span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={budgetData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="category" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickFormatter={(value) => `₱${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => `₱${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="budgeted" fill="#3b82f6" name="Budgeted" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" fill="#f59e0b" name="Actual" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
