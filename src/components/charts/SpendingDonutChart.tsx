import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { financialData } from "@/data/mockData";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface SpendingDonutChartProps {
  transactions?: Transaction[];
}

const COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#06b6d4', // teal
  '#ef4444', // red
];

export const SpendingDonutChart = ({ transactions = [] }: SpendingDonutChartProps) => {
  // Calculate spending by category including new transactions
  const spendingByCategory = financialData.spending.map(category => ({ ...category }));
  
  // Add new expense transactions
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const existingCategory = spendingByCategory.find(cat => cat.category === transaction.category);
      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        spendingByCategory.push({
          category: transaction.category,
          amount: transaction.amount,
          percentage: 0
        });
      }
    }
  });

  // Recalculate percentages
  const totalAmount = spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0);
  spendingByCategory.forEach(cat => {
    cat.percentage = (cat.amount / totalAmount) * 100;
  });

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Spending Breakdown</h3>
        <p className="text-xs text-gray-600">Monthly Composition</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={spendingByCategory}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="amount"
            label={({ percentage }) => `${percentage.toFixed(1)}%`}
            labelLine={false}
          >
            {spendingByCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number, name: string, props: any) => [
              `₱${value.toLocaleString()} (${props.payload.percentage.toFixed(1)}%)`,
              props.payload.category
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => entry.payload.category}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
