import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Timer } from "lucide-react";
import { rawTableData } from "@/data/mockData";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface RawDataChallengeProps {
  onReveal: () => void;
  activeTable?: 'financial' | 'sales' | null;
  onTableChange?: (table: 'financial' | 'sales' | null) => void;
  transactions?: Transaction[];
}

export const RawDataChallenge = ({ onReveal, activeTable, onTableChange, transactions = [] }: RawDataChallengeProps) => {
  const [timerActive, setTimerActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showData, setShowData] = useState(false);

  // Calculate updated financial data with transactions
  const getUpdatedFinancialData = () => {
    return rawTableData.finance.map((month, index) => {
      // Only update October (current month) with new transactions
      if (month.month === 'Oct') {
        const transactionIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const transactionExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const newIncome = month.income + transactionIncome;
        const newExpenses = month.expenses + transactionExpenses;
        const newSavings = newIncome - newExpenses;
        
        return {
          ...month,
          income: newIncome,
          expenses: newExpenses,
          savings: newSavings
        };
      }
      return month;
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const startTimer = () => {
    setTimerActive(true);
    setElapsedTime(0);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Simple Header */}
      <header className="bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
             <div>
               <h1 
                 className="text-2xl font-bold cursor-pointer hover:text-blue-600 transition-colors" 
                 style={{ color: '#1F2937' }}
                 onClick={() => {
                   setShowData(false);
                   setTimerActive(false);
                   setElapsedTime(0);
                   onTableChange?.(null);
                 }}
               >
                 CMSC 161 DEMO
               </h1>
               <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Data Visualization Principles</p>
             </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => onTableChange?.('financial')}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTable === 'financial'
                    ? 'text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={activeTable === 'financial' ? {
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                } : {
                  backgroundColor: 'transparent',
                  color: '#6B7280'
                }}
              >
                Financial Data
              </Button>
              
                  <Button
                    onClick={() => onTableChange?.('sales')}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTable === 'sales'
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={activeTable === 'sales' ? {
                      backgroundColor: '#3B82F6',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                    } : {
                      backgroundColor: 'transparent',
                      color: '#6B7280'
                    }}
                  >
                    Sales Data
                  </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Challenge Section */}
      <section className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-4xl mx-auto px-6 flex-1 flex flex-col justify-start py-8">

          <div className="bg-white rounded-xl shadow-lg p-8" style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>Data Analysis Challenge</h3>
                <p className="text-base" style={{ color: '#6B7280' }}>Test your ability to extract insights from raw data</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span className="font-mono text-lg font-semibold" style={{ color: '#1F2937' }}>{formatTime(elapsedTime)}</span>
                  </div>
                </div>
                    {timerActive && (
                      <Button 
                        onClick={stopTimer} 
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Stop Timer
                      </Button>
                    )}
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-lg font-medium mb-2" style={{ color: '#1F2937' }}>
                  {activeTable === 'financial' ? (
                    <>Find: <span className="font-bold text-blue-600">The month with highest income</span> and{" "}
                    <span className="font-bold text-blue-600">the month with lowest expenses</span></>
                  ) : activeTable === 'sales' ? (
                    <>Find: <span className="font-bold text-blue-600">The product with highest conversion rate</span> and{" "}
                    <span className="font-bold text-blue-600">the model with most product views but lowest conversion</span></>
                  ) : (
                    <>Choose a data type from the navigation to start the challenge</>
                  )}
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  {!activeTable ? 'Use the navigation above to select your data type' : 'Use the data table to find the answers quickly'}
                </p>
              </div>

              {activeTable && !showData && (
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Button 
                    onClick={() => {
                      setShowData(true);
                      if (!timerActive) {
                        setTimerActive(true);
                        setElapsedTime(0);
                      }
                    }} 
                    className="px-8 py-4 text-base font-semibold rounded-lg"
                    style={{ 
                      backgroundColor: '#10B981',
                      color: '#FFFFFF'
                    }}
                  >
                    Show Data
                  </Button>
                </div>
              )}
            </div>

            {showData && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col" style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="flex-1 flex flex-col">
                  {activeTable === 'financial' ? (
                    <div className="flex-1 flex flex-col">
                      <div className="px-4 py-3 border-b flex-shrink-0" style={{ 
                        backgroundColor: '#F8FAFC',
                        borderColor: '#E5E7EB'
                      }}>
                        <h3 className="text-base font-semibold" style={{ color: '#1F2937' }}>Financial Data</h3>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Monthly financial performance data</p>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm">
                          <thead className="sticky top-0" style={{ backgroundColor: '#F9FAFB' }}>
                            <tr>
                              <th className="text-left px-3 py-2 font-semibold" style={{ color: '#374151' }}>Month</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Income</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Expenses</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getUpdatedFinancialData().map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#E5E7EB' }}>
                                <td className="px-3 py-2 font-medium" style={{ color: '#1F2937' }}>{row.month}</td>
                                <td className="px-3 py-2 text-right font-mono text-green-600">₱{row.income.toLocaleString()}</td>
                                <td className="px-3 py-2 text-right font-mono text-red-600">₱{row.expenses.toLocaleString()}</td>
                                <td className="px-3 py-2 text-right font-mono text-blue-600">₱{row.savings.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <div className="px-4 py-3 border-b flex-shrink-0" style={{ 
                        backgroundColor: '#F8FAFC',
                        borderColor: '#E5E7EB'
                      }}>
                        <h3 className="text-base font-semibold" style={{ color: '#1F2937' }}>Sales Data</h3>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Victorinox Swiss Army knife product performance and revenue data</p>
                        <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Margin % = Profit margin percentage (how much profit per sale)</p>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm">
                          <thead className="sticky top-0" style={{ backgroundColor: '#F9FAFB' }}>
                            <tr>
                              <th className="text-left px-3 py-2 font-semibold" style={{ color: '#374151' }}>Product</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Revenue</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Product Views</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Units Sold</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Stock</th>
                              <th className="text-right px-3 py-2 font-semibold" style={{ color: '#374151' }}>Conversion Rate %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rawTableData.sales.map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#E5E7EB' }}>
                                <td className="px-3 py-2 font-medium" style={{ color: '#1F2937' }}>{row.product}</td>
                                <td className="px-3 py-2 text-right font-mono text-green-600">₱{row.revenue.toLocaleString()}</td>
                                <td className="px-3 py-2 text-right font-mono text-blue-600">{row.productViews.toLocaleString()}</td>
                                <td className="px-3 py-2 text-right font-mono text-purple-600">{row.unitsSold}</td>
                                <td className={`px-3 py-2 text-right font-mono ${row.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>{row.stock}</td>
                                <td className="px-3 py-2 text-right font-mono text-orange-600">{row.conversionRate}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* Call to Action - Bottom of Page */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>
              Ready to see the power of visualization?
            </h3>
            <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
              Difficult to parse raw data? Let's see how interactive charts can transform your understanding.
            </p>
            <Button 
              onClick={() => {
                onReveal();
              }} 
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Launch Interactive Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
