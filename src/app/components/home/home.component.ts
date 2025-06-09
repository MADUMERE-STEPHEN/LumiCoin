import { Component, OnInit, NgZone } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule, FormsModule, RouterLink, RouterModule], // <-- REMOVE BrowserModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trendingCoins: any[] = [];
  searchTerm: string = '';
  filteredTrendingCoins: any[] = [];

  constructor(private coinApi: CryptoService, private zone: NgZone, private appComponent: AppComponent) { }

  
handleError(error: any) {
  if (error.status === 429) {
    this.appComponent.showAlert('Too Many Requests. Please try again later.', 'error');
  } else {
    this.appComponent.showAlert('An error occurred. Please try again.', 'error');
  }
}
  ngOnInit(): void {
    // Fetch trending coins
    this.coinApi.getTrending().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.trendingCoins = res.coins || [];
          console.log('Trending coins:', this.trendingCoins);
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error fetching trending coins:', err);
          this.trendingCoins = [];
        });
      }
    });

    // Fetch top gainers
    this.coinApi.getTopGainers().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.topGainers = res || [];
          console.log('Top gainers:', this.topGainers);
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error fetching top gainers:', err);
          this.topGainers = [];
        });
      }
    });

    this.coinApi.getGlobalMarketData().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          console.log('Global market data:', res);
          this.globalMarketData = res || {};
        });
      }
      ,
      error: (err) => { 
        this.zone.run(() => {
          console.error('Error fetching global market data:', err);
          this.globalMarketData = {};
        });
      }
    });


    //fetch top losers
    this.coinApi.getTopLosers().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.topLosers = res || [];
          console.log('Top losers:', this.topLosers);
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error fetching top losers:', err);
          this.topLosers = [];
        });
      }
    });
  }

  filterCoins() {
    if (!this.searchTerm) {
      this.filteredTrendingCoins = this.trendingCoins;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTrendingCoins = this.trendingCoins.filter(coin =>
        coin.item.name.toLowerCase().includes(term) ||
        coin.item.symbol.toLowerCase().includes(term)
      );
    }
  }

  topGainers: any[] = [];
  topLosers: any[] = [];
  globalMarketData: any = {};
}
