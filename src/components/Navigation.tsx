import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection: 'financial' | 'sales';
  onSectionChange: (section: 'financial' | 'sales') => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="flex space-x-2">
      <Button
        variant={activeSection === 'financial' ? 'default' : 'ghost'}
        onClick={() => onSectionChange('financial')}
        className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          activeSection === 'financial'
            ? 'text-white shadow-md'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        style={activeSection === 'financial' ? {
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
        } : {
          backgroundColor: 'transparent',
          color: '#6B7280'
        }}
      >
        Financial Health
      </Button>
      
          <Button
            variant={activeSection === 'sales' ? 'default' : 'ghost'}
            onClick={() => onSectionChange('sales')}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeSection === 'sales'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            style={activeSection === 'sales' ? {
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
            } : {
              backgroundColor: 'transparent',
              color: '#6B7280'
            }}
          >
            Retail Sales
          </Button>
    </nav>
  );
};
