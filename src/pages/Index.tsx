import { useState } from "react";
import { RawDataChallenge } from "@/components/RawDataChallenge";
import { FinancialHealthSection } from "@/components/FinancialHealthSection";
import { RetailSalesSection } from "@/components/RetailSalesSection";
import { Navigation } from "@/components/Navigation";

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeSection, setActiveSection] = useState<'financial' | 'sales'>('financial');
  const [activeTable, setActiveTable] = useState<'financial' | 'sales' | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleReveal = () => {
    setShowDashboard(true);
    setTimeout(() => {
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTableChange = (table: 'financial' | 'sales' | null) => {
    setActiveTable(table);
    if (table === 'financial') {
      setActiveSection('financial');
    } else if (table === 'sales') {
      setActiveSection('sales');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F7FA' }}>
      <RawDataChallenge 
        onReveal={handleReveal} 
        activeTable={activeTable}
        onTableChange={handleTableChange}
        transactions={transactions}
      />

      {showDashboard && (
        <div id="dashboard" className="animate-fade-in min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
          {/* Simple Header */}
          <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: '#E5E7EB' }}>
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>CMSC 161 DEMO</h1>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Interactive Dashboard</p>
                </div>
                <Navigation 
                  activeSection={activeSection} 
                  onSectionChange={setActiveSection}
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              {activeSection === 'financial' && <FinancialHealthSection transactions={transactions} setTransactions={setTransactions} />}
              {activeSection === 'sales' && <RetailSalesSection />}
            </div>
          </main>

        </div>
      )}
    </div>
  );
};

export default Index;