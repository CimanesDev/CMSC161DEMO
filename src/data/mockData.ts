// Mock data for Financial Health and Work Flow dashboards

export const financialData = {
  netWorth: [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 46334 },
    { month: 'Mar', value: 45457 },
    { month: 'Apr', value: 46924 },
    { month: 'May', value: 48269 },
    { month: 'Jun', value: 49836 },
    { month: 'Jul', value: 51625 },
    { month: 'Aug', value: 53148 },
    { month: 'Sep', value: 54893 },
    { month: 'Oct', value: 56627 },
  ],
  expenses: [
    { month: 'Jan', value: 3800 },
    { month: 'Feb', value: 3900 },
    { month: 'Mar', value: 4200 },
    { month: 'Apr', value: 3950 },
    { month: 'May', value: 4100 },
    { month: 'Jun', value: 4000 },
    { month: 'Jul', value: 3900 },
    { month: 'Aug', value: 3950 },
    { month: 'Sep', value: 4000 },
    { month: 'Oct', value: 4100 },
  ],
  spending: [
    { category: 'Food', amount: 1200, percentage: 30 },
    { category: 'Transport', amount: 800, percentage: 20 },
    { category: 'Entertainment', amount: 600, percentage: 15 },
    { category: 'Utilities', amount: 500, percentage: 12.5 },
    { category: 'Other', amount: 900, percentage: 22.5 },
  ],
  budget: [
    { category: 'Food', budgeted: 1000, actual: 1200 },
    { category: 'Transport', budgeted: 600, actual: 800 },
    { category: 'Entertainment', budgeted: 400, actual: 600 },
    { category: 'Utilities', budgeted: 400, actual: 500 },
    { category: 'Other', budgeted: 600, actual: 900 },
  ],
};

export const salesData = {
  dailyRevenue: [
    { day: 'Mon', revenue: 18500, aov: 148 },
    { day: 'Tue', revenue: 22100, aov: 162 },
    { day: 'Wed', revenue: 25600, aov: 155 },
    { day: 'Thu', revenue: 28900, aov: 168 },
    { day: 'Fri', revenue: 32400, aov: 175 },
    { day: 'Sat', revenue: 28900, aov: 185 },
    { day: 'Sun', revenue: 23100, aov: 158 },
  ],
  weeklyTrend: [
    { week: 'Week 1', revenue: 185000, units: 1250 },
    { week: 'Week 2', revenue: 198000, units: 1320 },
    { week: 'Week 3', revenue: 221000, units: 1480 },
    { week: 'Week 4', revenue: 256000, units: 1680 },
  ],
  inventoryStatus: [
    { category: 'In Stock', count: 85, percentage: 68 },
    { category: 'Low Stock', count: 25, percentage: 20 },
    { category: 'Out of Stock', count: 15, percentage: 12 },
  ],
  salesComposition: [
    { category: 'Compact', revenue: 52000, percentage: 32 },
    { category: 'Standard', revenue: 48000, percentage: 30 },
    { category: 'Professional', revenue: 38000, percentage: 24 },
    { category: 'Premium', revenue: 22000, percentage: 14 },
  ],
};

export const rawTableData = {
  finance: [
    { month: 'Jan', income: 4875, expenses: 3800, savings: 1075 },
    { month: 'Feb', income: 5234, expenses: 3900, savings: 1334 },
    { month: 'Mar', income: 5123, expenses: 4200, savings: 923 },
    { month: 'Apr', income: 5467, expenses: 3950, savings: 1517 },
    { month: 'May', income: 5345, expenses: 4100, savings: 1245 },
    { month: 'Jun', income: 4567, expenses: 4000, savings: 567 },
    { month: 'Jul', income: 5689, expenses: 3900, savings: 1789 },
    { month: 'Aug', income: 5523, expenses: 3950, savings: 1573 },
    { month: 'Sep', income: 5745, expenses: 4000, savings: 1745 },
    { month: 'Oct', income: 5834, expenses: 4100, savings: 1734 },
  ],
  sales: [
    { product: 'Classic SD', revenue: 18500, unitsSold: 125, stock: 45, margin: 28, productViews: 5000, conversionRate: 2.5 },
    { product: 'Alox Pioneer', revenue: 22100, unitsSold: 68, stock: 12, margin: 35, productViews: 3778, conversionRate: 1.8 },
    { product: 'Champ', revenue: 28900, unitsSold: 42, stock: 8, margin: 45, productViews: 1355, conversionRate: 3.1 },
    { product: 'Huntsman', revenue: 25600, unitsSold: 58, stock: 15, margin: 38, productViews: 2800, conversionRate: 2.1 },
    { product: 'Minichamp', revenue: 15200, unitsSold: 95, stock: 32, margin: 32, productViews: 5938, conversionRate: 1.6 },
    { product: 'SwissChamp', revenue: 32400, unitsSold: 28, stock: 5, margin: 48, productViews: 870, conversionRate: 3.2 },
    { product: 'Spartan', revenue: 19800, unitsSold: 78, stock: 22, margin: 33, productViews: 3000, conversionRate: 2.6 },
    { product: 'Climber', revenue: 23100, unitsSold: 62, stock: 18, margin: 36, productViews: 2583, conversionRate: 2.4 },
  ],
};
