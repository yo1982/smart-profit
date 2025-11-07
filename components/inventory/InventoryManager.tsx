import React, { useState, useCallback } from 'react';
import { mockProducts } from '../../services/mockData';
import { Product } from '../../types';
import { getReorderSuggestion } from '../../services/geminiService';

const InventoryManager: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleGetSuggestion = useCallback(async (product: Product) => {
    setLoading(prevState => ({ ...prevState, [product.id]: true }));
    const suggestion = await getReorderSuggestion(product);
    setSuggestions(prevState => ({ ...prevState, [product.id]: suggestion }));
    setLoading(prevState => ({ ...prevState, [product.id]: false }));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">In Transit</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stock</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Reorder Suggestion</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const totalStock = product.inventory.current + product.inventory.inTransit + product.inventory.factory + product.inventory.platformFulfillment;
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{product.inventory.current}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.inventory.inTransit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.inventory.factory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.inventory.platformFulfillment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">{totalStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loading[product.id] ? (
                       <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </div>
                    ) : suggestions[product.id] ? (
                      <span className={`font-semibold ${suggestions[product.id]?.includes('CRITICAL') ? 'text-red-600' : 'text-green-600'}`}>{suggestions[product.id]}</span>
                    ) : (
                      <button 
                        onClick={() => handleGetSuggestion(product)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition"
                      >
                        Get Suggestion
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager;
