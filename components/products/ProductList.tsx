import React, { useState, useMemo } from 'react';
import { mockProducts, calculateNetProfit } from '../../services/mockData';
import { Product, Platform } from '../../types';

const ProductList: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  
  const formattedProducts = useMemo(() => {
    return products.map(p => ({
      ...p,
      netProfit: calculateNetProfit(p)
    }));
  }, [products]);

  const getPlatformColor = (platform: Platform) => {
    switch(platform) {
      case Platform.AMAZON: return 'bg-yellow-400 text-yellow-800';
      case Platform.NOON: return 'bg-yellow-200 text-yellow-800';
      case Platform.SHOPIFY: return 'bg-green-400 text-green-800';
      case Platform.SALLA: return 'bg-purple-400 text-purple-800';
      case Platform.ZID: return 'bg-blue-400 text-blue-800';
      default: return 'bg-gray-400 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products & Profitability</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Add Product
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COGS</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees & Costs</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Profit</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formattedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlatformColor(product.platform)}`}>
                    {product.platform}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${product.saleInfo.sellingPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.cost.cogs.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(product.saleInfo.sellingPrice - product.netProfit - product.cost.cogs).toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${product.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${product.netProfit.toFixed(2)}
                </td>
                 <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${product.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {((product.netProfit / product.saleInfo.sellingPrice) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
