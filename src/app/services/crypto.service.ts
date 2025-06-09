import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  getTrending() {
    return this.http.get(`${this.baseUrl}/search/trending`);
  }

  // Add this method to get top gainers (sorted by 24h change, descending)
  getTopGainers() {
    return this.http.get(
      `${this.baseUrl}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_desc',
          per_page: '10',
          page: '1',
          price_change_percentage: '24h'
        }
      }
    );
  }

  getCoinDetails(coinId: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}`);
  }
  getCoinHistory(coinId: string, days: number) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days.toString(),
        interval: 'daily'
      }
    });
  }
  getCoinMarketData(coinId: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1',
        interval: 'hourly'
      }
    });
  }

  getTopLosers() {
    return this.http.get(
      `${this.baseUrl}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_asc',
          per_page: '10',
          page: '1',
          price_change_percentage: '24h'
        }
      }
    );
  }

  getCoinPrice(coinId: string) {
    return this.http.get(`${this.baseUrl}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: 'usd'
      }
    });
  }
  getGlobalMarketData() {
    const proxy = 'https://corsproxy.io/?';
    return this.http.get(proxy + 'https://api.coingecko.com/api/v3/global');
  }

  getSearchResults(query: string) {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { query }
    });
  }

  getCoinOHLC(coinId: string, days: number) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/ohlc`, {
      params: {
        vs_currency: 'usd',
        days: days.toString()
      }
    });
  }

  getCoinExchanges(coinId: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/tickers`);
  }

  getCoinContract(coinId: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/contract`);
  }

  getCoinStatusUpdates(coinId: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/status_updates`);
  }

  getCoinHistoryByDate(coinId: string, date: string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/history`, {
      params: {
        date: date,
        localization: 'false'
      }
    });
  }

  getCoinCategories() {
    return this.http.get(`${this.baseUrl}/coins/categories/list`);
  }

  getCoinCategoryCoins(categoryId: string) {
    return this.http.get(`${this.baseUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        category: categoryId,
        order: 'market_cap_desc',
        per_page: '10',
        page: '1',
        sparkline: 'false'
      }
    });
  }

  getCoinExchangesList() {
    return this.http.get(`${this.baseUrl}/exchanges`);
  }

  getCoinExchangeDetails(exchangeId: string) {
    return this.http.get(`${this.baseUrl}/exchanges/${exchangeId}`);
  }

  getCoinMarketChart(coinId: string, vsCurrency: string, days: number | string) {
    return this.http.get(`${this.baseUrl}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: vsCurrency,
        days: days,
        interval: 'daily'
      }
    });
  }

  // Prepend the proxy URL for the Tether coin details
  getTetherCoinDetails() {
    const proxy = 'https://corsproxy.io/?';
    return this.http.get(proxy + 'https://api.coingecko.com/api/v3/coins/tether');
  }

  getnews() {
    const proxy = 'https://corsproxy.io/?';
    return this.http.get(proxy + 'https://api.coingecko.com/api/v3/news');
  }

  getEthereumMarketChart() {
    return this.http.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
      params: {
        vs_currency: 'usd',
        days: '1'
      }
    });
  }
}
