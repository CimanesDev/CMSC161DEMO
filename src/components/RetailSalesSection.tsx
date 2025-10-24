import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesTrendChart } from "@/components/charts/SalesTrendChart";
import { ProductComparisonChart } from "@/components/charts/ProductComparisonChart";
import { InventoryStatusChart } from "@/components/charts/InventoryStatusChart";
import { salesData, rawTableData } from "@/data/mockData";

export const RetailSalesSection = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter'>('week');

  // Calculate KPIs from real table data
  const totalRevenue = rawTableData.sales.reduce((sum, product) => sum + product.revenue, 0);
  const totalUnits = rawTableData.sales.reduce((sum, product) => sum + product.unitsSold, 0);
  const lowStockItems = rawTableData.sales.filter(product => product.stock < 10).length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>Victorinox Sales Performance</h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>Swiss Army Knife E-commerce Dashboard - Track sales, inventory, and product performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Total Revenue</p>
              <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>₱{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="text-green-600 text-xl font-bold">+12.5%</div>
              <p className="text-xs" style={{ color: '#6B7280' }}>vs last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Units Sold</p>
              <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>{totalUnits.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="text-blue-600 text-xl font-bold">+8.3%</div>
              <p className="text-xs" style={{ color: '#6B7280' }}>vs last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Stock Alerts</p>
              <p className="text-3xl font-bold" style={{ color: lowStockItems > 0 ? '#EF4444' : '#10B981' }}>
                {lowStockItems}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-xl font-bold ${lowStockItems > 0 ? 'text-red-500' : 'text-green-600'}`}>
                {lowStockItems > 0 ? 'Low Stock' : 'All Good'}
              </div>
              <p className="text-xs" style={{ color: '#6B7280' }}>items need attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB'
      }}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Time Period Filter</h3>
          <Select value={timeFilter} onValueChange={(value: 'week' | 'month' | 'quarter') => setTimeFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Sales Trend Analysis</h3>
          <SalesTrendChart timeFilter={timeFilter} />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Product Performance</h3>
          <ProductComparisonChart />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border" style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Inventory Status</h3>
          <InventoryStatusChart />
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
              <span><strong style={{ color: '#1F2937' }}>Analyzing Trends:</strong> Dual-axis chart shows revenue and AOV correlation over time</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Evaluating Items:</strong> Horizontal bars instantly identify top-performing products</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Current State:</strong> Gauge chart highlights inventory alerts requiring immediate action</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"></div>
              <span><strong style={{ color: '#1F2937' }}>Composition:</strong> Pie chart shows revenue breakdown by product categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
