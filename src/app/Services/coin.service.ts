//https://api.coinstats.app/public/v1/coins?skip=0&limit=5&currency=EUR
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CoinModel,
  MarketModel,
  NewsModel,
  Tickers,
} from '../Models/coin.models';
import { Currency, SupportedExchanges } from '../modules/Shared/Enums';

@Injectable({ providedIn: 'root' })
export class CoinService {
  private _url = 'http://api.coinstats.app/public/v1/';
  private _limit = 'limit=';
  private _skip = 'skip=';

  constructor(private http: HttpClient) {}

  getCoins(
    lim: string = '100',
    toSkip: string = '0',
    currencyRef?: Currency
  ): Observable<CoinModel[]> {
    const endpoint = 'coins';
    const currency = 'currency=';
    return this.http.get<CoinModel[]>(
      `${this._url}${endpoint}?${this._limit}${lim}&${this._skip}${toSkip}&${currency}${currencyRef}`
    );
  }

  getCoinByName(name: string, offset: string) {
    const endpoint = 'coins';
    const currency = 'currency=';
    return this.http.get<CoinModel[]>(
      `${this._url}${endpoint}?${this._limit}100&${this._skip}${offset}&${currency}&keyword=${name}`
    );
  }

  getNews(lim?: string, toSkip?: string) {
    const endpoint = 'news';
    return this.http.get<NewsModel[]>(
      `${this._url}${endpoint}?${this._limit}${lim}&${this._skip}${toSkip}`
    );
  }

  getChart(chartPeriod: string = '1m', coin: string) {
    const endpoint = 'charts';
    const period = 'period=';
    const coinId = 'coinId=';
    return this.http.get<Array<Array<number>>>(
      `${this._url}${endpoint}?${period}${chartPeriod}&${coinId}${coin}`
    );
  }

  getMarketsByCoin(coinId: string) {
    const endpoint = 'markets';
    const Id = 'coinId=';

    return this.http.get<MarketModel[]>(
      `${this._url}${endpoint}?${Id}${coinId}`
    );
  }

  getTickers(ex: SupportedExchanges, coinPair: string) {
    const endpoint = 'tickers';
    const exchange = 'exchange=';
    const pair = 'pair=';

    return this.http.get<Tickers>(
      `${this._url}${endpoint}?${exchange}${ex}&${pair}${coinPair}`
    );
  }
}
