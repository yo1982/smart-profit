export type View = 'dashboard' | 'products' | 'inventory' | 'pricing' | 'settings';

export enum Platform {
  AMAZON = 'Amazon',
  NOON = 'Noon',
  SHOPIFY = 'Shopify',
  SALLA = 'Salla',
  ZID = 'Zid',
}

export interface ProductCost {
  purchasePrice: number;
  inboundShipping: number;
  storageFee: number;
  cogs: number;
}

export interface ProductSaleInfo {
  sellingPrice: number;
  commissionPercent: number;
  taxPercent: number;
  shippingFee: number;
  advertisingCost: number;
}

export interface Inventory {
  current: number;
  inTransit: number;
  factory: number;
  platformFulfillment: number; // e.g., FBA
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  platform: Platform;
  cost: ProductCost;
  saleInfo: ProductSaleInfo;
  inventory: Inventory;
  salesVolume: number; // units sold last 30 days
  competitorPrice: number;
  priceFloor: number;
  priceCeiling: number;
}

export interface KpiData {
  totalSales: number;
  netProfit: number;
  lossMakingProducts: number;
  capitalTurnoverRate: number;
}
