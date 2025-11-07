import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockKpiData, mockProducts, calculateNetProfit } from '../../services/mockData';
import KpiCard from './KpiCard';
import { Platform } from '../../types';

const Dashboard: React.FC = () => {

    const platformProfitData = Object.values(Platform).map(platform => {
        const platformProducts = mockProducts.filter(p => p.platform === platform);
        const totalProfit = platformProducts.reduce((sum, p) => sum + calculateNetProfit(p) * p.salesVolume, 0);
        return { name: platform, value: totalProfit };
    }).filter(p => p.value > 0);

    const profitAndSalesData = mockProducts.map(p => ({
        name: p.name.substring(0, 15) + '...',
        sales: p.saleInfo.sellingPrice * p.salesVolume,
        profit: calculateNetProfit(p) * p.salesVolume,
    })).sort((a,b) => b.profit - a.profit).slice(0, 5);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Sales" value={`$${mockKpiData.totalSales.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} change="+12.5%" changeType="positive" />
        <KpiCard title="Net Profit" value={`$${mockKpiData.netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} change="+8.2%" changeType="positive" />
        <KpiCard title="Loss-Making Products" value={mockKpiData.lossMakingProducts.toString()} change="-2" changeType="negative" />
        <KpiCard title="Capital Turnover Rate" value={mockKpiData.capitalTurnoverRate.toString()} change="+0.5" changeType="positive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Profitable Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitAndSalesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profit by Platform</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformProfitData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {platformProfitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
