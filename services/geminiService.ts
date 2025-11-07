import { Product } from '../types';
// FIX: Replaced mock service with actual Gemini API implementation.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPricingSuggestion = async (product: Product): Promise<string> => {
  const prompt = `
    Analyze the following e-commerce product data and provide a dynamic pricing suggestion.
    Product Name: ${product.name}
    Current Selling Price: $${product.saleInfo.sellingPrice.toFixed(2)}
    Cost of Goods Sold (COGS): $${product.cost.cogs.toFixed(2)}
    Main Competitor's Price: $${product.competitorPrice.toFixed(2)}
    Current Inventory Level: ${product.inventory.current + product.inventory.platformFulfillment} units
    Sales Velocity (last 30 days): ${product.salesVolume} units
    My acceptable price floor is $${product.priceFloor.toFixed(2)} and ceiling is $${product.priceCeiling.toFixed(2)}.

    Based on this data, suggest an optimal new selling price. Your goal is to maximize profit while remaining competitive.
    Provide a brief justification for your suggestion.
    The response should be a short, actionable sentence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching pricing suggestion:", error);
    return "Error: Could not retrieve suggestion.";
  }
};

export const getReorderSuggestion = async (product: Product): Promise<string> => {
  const prompt = `
    Analyze the inventory and sales data for the following e-commerce product and provide a smart reorder suggestion.
    Product Name: ${product.name}
    Sales Velocity (last 30 days): ${product.salesVolume} units
    Current Available Inventory (Warehouse + Fulfillment): ${product.inventory.current + product.inventory.platformFulfillment} units
    Inventory In Transit: ${product.inventory.inTransit} units
    Lead Time (from factory): 21 days
    
    Based on this data, calculate the current days of stock remaining.
    Suggest an optimal reorder quantity to maintain a 30-day safety stock level.
    The response should be a short, actionable sentence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching reorder suggestion:", error);
    return "Error: Could not retrieve suggestion.";
  }
};
