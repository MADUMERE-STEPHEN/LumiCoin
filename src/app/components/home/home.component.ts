import { Component, OnInit, NgZone } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trendingCoins: any[] = [];
  searchTerm: string = '';
  filteredTrendingCoins: any[] = [];
  alertMessage: string = '';
  alertType: string = '';
  topGainers: any[] = [];
  topLosers: any[] = [];
  globalMarketData: any = {};

  closeAlert() {
    this.alertMessage = '';
    this.alertType = '';
  }

  constructor(
    private coinApi: CryptoService,
    private zone: NgZone,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
      setTimeout(() => this.closeAlert(), 5000);
    });

    // Fetch trending coins
    this.coinApi.getTrending().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.trendingCoins = res.coins || [];
          this.filteredTrendingCoins = this.trendingCoins;
          console.log('Trending coins:', this.trendingCoins);
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error fetching trending coins:', err);
          this.trendingCoins = [];
          if (err.status === 429) {
            this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
          } else {
            this.alertService.showAlert('Failed to load trending coins.', 'error');
          }
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
          if (err.status === 429) {
            this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
          }
        });
      }
    });

    // Fetch global market data
    this.coinApi.getGlobalMarketData().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          console.log('Global market data:', res);
          this.globalMarketData = res || {};
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Error fetching global market data:', err);
          this.globalMarketData = {};
          if (err.status === 429) {
            this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
          }
        });
      }
    });

    // Fetch top losers
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
          if (err.status === 429) {
            this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
          }
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

  goToCoin(id: string) {
    this.router.navigate(['/coin', id]);
  }
}
