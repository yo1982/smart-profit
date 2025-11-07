import { Product, Platform, KpiData } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    sku: 'WNH-BLK-001',
    platform: Platform.AMAZON,
    cost: { purchasePrice: 45.0, inboundShipping: 2.5, storageFee: 1.0, cogs: 48.5 },
    saleInfo: { sellingPrice: 99.99, commissionPercent: 15, taxPercent: 5, shippingFee: 5.0, advertisingCost: 10.0 },
    inventory: { current: 150, inTransit: 50, factory: 200, platformFulfillment: 75 },
    salesVolume: 210,
    competitorPrice: 98.50,
    priceFloor: 85.00,
    priceCeiling: 110.00,
  },
  {
    id: '2',
    name: 'Smart Watch with Heart Rate Monitor',
    sku: 'SW-HRM-002',
    platform: Platform.NOON,
    cost: { purchasePrice: 30.0, inboundShipping: 2.0, storageFee: 0.75, cogs: 32.75 },
    saleInfo: { sellingPrice: 79.50, commissionPercent: 12, taxPercent: 5, shippingFee: 4.5, advertisingCost: 8.0 },
    inventory: { current: 200, inTransit: 100, factory: 150, platformFulfillment: 50 },
    salesVolume: 350,
    competitorPrice: 81.00,
    priceFloor: 70.00,
    priceCeiling: 90.00,
  },
  {
    id: '3',
    name: 'Organic Green Tea (100 bags)',
    sku: 'OGT-100-003',
    platform: Platform.SHOPIFY,
    cost: { purchasePrice: 8.0, inboundShipping: 1.0, storageFee: 0.25, cogs: 9.25 },
    saleInfo: { sellingPrice: 19.99, commissionPercent: 2.9, taxPercent: 0, shippingFee: 3.0, advertisingCost: 2.5 },
    inventory: { current: 500, inTransit: 250, factory: 1000, platformFulfillment: 0 },
    salesVolume: 800,
    competitorPrice: 19.50,
    priceFloor: 18.00,
    priceCeiling: 25.00,
  },
  {
    id: '4',
    name: 'Portable Power Bank 20000mAh',
    sku: 'PPB-20K-004',
    platform: Platform.AMAZON,
    cost: { purchasePrice: 18.0, inboundShipping: 1.5, storageFee: 0.5, cogs: 20.0 },
    saleInfo: { sellingPrice: 45.00, commissionPercent: 15, taxPercent: 5, shippingFee: 4.0, advertisingCost: 5.0 },
    inventory: { current: 80, inTransit: 200, factory: 0, platformFulfillment: 40 },
    salesVolume: 150,
    competitorPrice: 42.99,
    priceFloor: 40.00,
    priceCeiling: 55.00,
  },
  {
    id: '5',
    name: 'Handmade Leather Wallet',
    sku: 'HLW-BRN-005',
    platform: Platform.SALLA,
    cost: { purchasePrice: 12.0, inboundShipping: 0.5, storageFee: 0.1, cogs: 12.6 },
    saleInfo: { sellingPrice: 35.00, commissionPercent: 5, taxPercent: 5, shippingFee: 3.5, advertisingCost: 4.0 },
    inventory: { current: 300, inTransit: 0, factory: 100, platformFulfillment: 0 },
    salesVolume: 120,
    competitorPrice: 38.00,
    priceFloor: 30.00,
    priceCeiling: 45.00,
  },
];


export const calculateNetProfit = (product: Product): number => {
    const commission = product.saleInfo.sellingPrice * (product.saleInfo.commissionPercent / 100);
    const tax = product.saleInfo.sellingPrice * (product.saleInfo.taxPercent / 100);
    return product.saleInfo.sellingPrice - product.cost.cogs - commission - tax - product.saleInfo.shippingFee - product.saleInfo.advertisingCost;
};

export const mockKpiData: KpiData = {
    totalSales: mockProducts.reduce((sum, p) => sum + p.saleInfo.sellingPrice * p.salesVolume, 0),
    netProfit: mockProducts.reduce((sum, p) => sum + calculateNetProfit(p) * p.salesVolume, 0),
    lossMakingProducts: mockProducts.filter(p => calculateNetProfit(p) < 0).length,
    capitalTurnoverRate: 4.5, // Mock data
};
