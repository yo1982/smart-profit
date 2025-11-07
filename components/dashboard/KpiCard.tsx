import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType }) => {
  const isPositive = changeType === 'positive';
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <div className="mt-2 flex items-center text-sm">
        <span className={`flex items-center font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          ) : (
             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          )}
          {change}
        </span>
        <span className="text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default KpiCard;
