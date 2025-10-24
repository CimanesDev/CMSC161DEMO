import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NetWorthChart } from "@/components/charts/NetWorthChart";
import { SpendingDonutChart } from "@/components/charts/SpendingDonutChart";
import { SavingsGoalChart } from "@/components/charts/SavingsGoalChart";
import { rawTableData } from "@/data/mockData";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface FinancialHealthSectionProps {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export const FinancialHealthSection = ({ transactions, setTransactions }: FinancialHealthSectionProps) => {
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: ''
  });
  // Calculate real net worth from savings data + new transactions
  const baseSavings = rawTableData.finance.reduce((sum, month) => sum + month.savings, 0);
  const transactionImpact = transactions.reduce((sum, t) => 
    t.type === 'income' ? sum + t.amount : sum - t.amount, 0
  );
  const currentNetWorth = baseSavings + transactionImpact;

  // Calculate previous month net worth for comparison (September savings)
  const previousMonthSavings = rawTableData.finance.find(m => m.month === 'Sep')?.savings || 1745;
  const previousNetWorth = baseSavings - previousMonthSavings;
  const netWorthChange = currentNetWorth - previousNetWorth;
  const netWorthChangePercent = ((netWorthChange / previousNetWorth) * 100).toFixed(1);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransaction.amount || !newTransaction.category) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(newTransaction.amount),
      type: newTransaction.type,
      category: newTransaction.category,
      date: new Date()
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({ amount: '', type: 'expense', category: '' });
  };

  // Use all transactions for charts
  const filteredTransactions = transactions;

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Utilities', 'Salary', 'Freelance', 'Investment'
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>Financial Health</h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>Track your financial progress with interactive charts</p>
      </div>

      {/* KPI Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB'
      }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Total Net Worth</p>
            <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>₱{currentNetWorth.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className={`text-xl font-bold ${netWorthChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {netWorthChange >= 0 ? '+' : ''}{netWorthChangePercent}%
            </div>
            <p className="text-xs" style={{ color: '#6B7280' }}>vs last month</p>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB'
      }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Add Transaction</h3>
        <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="amount" className="text-sm font-medium mb-1 block" style={{ color: '#374151' }}>Amount (₱)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="h-10 text-sm rounded-md border focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-sm font-medium mb-1 block" style={{ color: '#374151' }}>Type</Label>
            <Select
              value={newTransaction.type}
              onValueChange={(value: 'income' | 'expense') => 
                setNewTransaction({ ...newTransaction, type: value })
              }
            >
              <SelectTrigger className="h-10 text-sm rounded-md border focus:border-blue-500 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category" className="text-sm font-medium mb-1 block" style={{ color: '#374151' }}>Category</Label>
            <Select
              value={newTransaction.category}
              onValueChange={(value) => 
                setNewTransaction({ ...newTransaction, category: value })
              }
            >
              <SelectTrigger className="h-10 text-sm rounded-md border focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              type="submit" 
              className="w-full h-10 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </div>


      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Financial Trend</h3>
          <NetWorthChart transactions={filteredTransactions} />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Spending Composition</h3>
          <SpendingDonutChart transactions={filteredTransactions} />
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Monthly Savings Goal</h3>
          <SavingsGoalChart transactions={filteredTransactions} />
        </div>
      </div>

      {/* HIG Principles */}
      <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB'
      }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Apple HIG Principles Demonstrated</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: '#6B7280' }}>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Analyzing Trends:</strong> Line chart shows net worth growth over time with smooth transitions</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Evaluating Items:</strong> Donut chart compares spending categories with clear proportions</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Consistency:</strong> Green for positive trends, Red for over budget, Blue for primary actions</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Comprehension:</strong> Clear titles, annotations, and intuitive color coding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
