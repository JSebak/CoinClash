export class CoinModel {
  id: string = '';
  icon: string = '';
  name: string = '';
  symbol: string = '';
  rank: number = 0;
  price: number = 0;
  priceBtc: number = 0;
  volume: number = 0;
  marketCap: number = 0;
  availableSupply: number = 0;
  totalSupply: number = 1000000;
  priceChange1h: number = 0;
  priceChange1d: number = 0;
  priceChange1w: number = 0;
  websiteUrl: string = '';
  redditUrl: string = '';
  twitterUrl: string = '';
  exp: string[] = [];

  constructor() {}
}

export class Image {
  path: string;
  extension: string;

  constructor() {
    this.path = '';
    this.extension = '';
  }
}

export class MarketModel {
  price: number;
  exchange: string;
  pair: string;
  volume: number;
}

export class NewsModel {
  id: string;
  feedDate: number;
  source: string;
  title: string;
  isFeatured: boolean;
  description: string;
  imgURL: string;
  link: string;
  sourceLink: string;
  reactionsCount: any;
  shareURL: string;
  relatedCoins: string[];
}

export class Tickers {
  from: string;
  to: string;
  exchange: string;
  price: number;
}
