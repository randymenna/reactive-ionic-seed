export interface ICryptonatorMarket {
  market: string,
  price: string,
  volume: number
}

export interface ICryptonatorTicker {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
  markets: ICryptonatorMarket[]
}

export interface ICryptonator {
  ticker: ICryptonatorTicker;
  timestamp: number;
  success: boolean;
  error: string;
}